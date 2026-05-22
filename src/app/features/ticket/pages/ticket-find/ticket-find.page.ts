// src/app/features/ticket/ticket-find/ticket-find.page.ts

import { Component, OnInit, AfterViewChecked, ViewChild, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonNote,
  IonBackButton,
  IonButtons,
  IonBadge,
  IonButton,
  IonIcon,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  personOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  lockClosedOutline, // ← adicionado para o ícone do comment-hint
} from 'ionicons/icons';

import { TicketService } from '../../services/ticket.service';
import { TicketPriority, TicketResponse } from '../../models/ticket.model';
import { TicketMessage } from '../../models/ticket-message.model';
import { TicketStatusPipe, TicketStatusColorPipe } from '../../pipe/ticket-status.pipe';
import { TokenStorageService } from '../../../../core/storage/token-storage.service';
import { UserProfile } from 'src/app/features/profile/models/profile.model';
interface SelectOption {
  label: string;
  value: string;
}

interface PriorityOption {
  label: string;
  value: TicketPriority;
}

interface JwtPayload {
  sub: string;
  name: string;
  role: string;
  exp: number;
}
export type SenderType = 'REQUESTER' | 'TECHNICIAN';

@Component({
  selector: 'app-ticket-find',
  templateUrl: './ticket-find.page.html',
  styleUrls: ['./ticket-find.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonNote,
    IonBackButton,
    IonButtons,
    IonBadge,
    TicketStatusPipe,
    TicketStatusColorPipe,
    IonButton,
    IonIcon,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class TicketFindPage implements OnInit, AfterViewChecked {
  // ── DI ──────────────────────────────────────────────────────────────
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);
  private readonly tokenStorage = inject(TokenStorageService);
  // ── ViewChild ────────────────────────────────────────────────────────
  @ViewChild('chatContent') private chatContent!: IonContent;
  @ViewChild('commentArea') private commentAreaRef!: ElementRef<HTMLElement>;
  // ── State ────────────────────────────────────────────────────────────
  ticket: TicketResponse | null = null;
  messages: TicketMessage[] = [];
  assignTo: UserProfile[] = [];
  currentUserName = '';
  currentUserPublicId = '';
  canManageTicket = false;
  isSubmitting = false;
  commentFocused = false;
  commentLength = 0;

  private shouldScrollToBottom = false;
  private ticketPublicId = '';

  // ── Select options ───────────────────────────────────────────────────
  public isUserMessage(message: TicketMessage): boolean {
    return message.senderType === 'REQUESTER';
  }

  readonly priorities: PriorityOption[] = [
    { label: 'Baixo', value: 'LOW' },
    { label: 'Médio', value: 'MEDIUM' },
    { label: 'Alto', value: 'HIGH' },
    { label: 'Crítico', value: 'CRITICAL' },
  ];

  readonly statusOptions: SelectOption[] = [
    { label: 'Aberto', value: 'OPEN' },
    { label: 'Em Andamento', value: 'IN_PROGRESS' },
    { label: 'Fechado', value: 'CLOSED' },
  ];

  // ── Form ─────────────────────────────────────────────────────────────
  form!: FormGroup;

  constructor() {
    addIcons({
      calendarOutline,
      personOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      lockClosedOutline,
    });
  }

  // ── Lifecycle ────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.buildForm();
    this.loadTicketData();
    this.loadTechnicians();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  // ── Actions ──────────────────────────────────────────────────────────

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.ticket) return;

    const loading = await this.loadingCtrl.create({
      message: 'Sending update...',
    });

    await loading.present();

    this.isSubmitting = true;

    try {
      const { priority, status, assignTo, comment } = this.form.value;
      console.log('assignTo do form:', assignTo);
      console.log('ticket.assignedTo:', this.ticket.assignedTo);
      // ─────────────────────────────────────────────
      // PRIORITY
      // ─────────────────────────────────────────────

      if (priority && priority !== this.ticket.priority) {
        await firstValueFrom(this.ticketService.assignPriority(this.ticket.publicId, priority));

        this.ticket.priority = priority;
      }

      // ─────────────────────────────────────────────
      // STATUS
      // ─────────────────────────────────────────────

      if (status && status !== this.ticket.status) {
        await firstValueFrom(this.ticketService.assignStatus(this.ticket.publicId, status));

        this.ticket.status = status;
      }

      // ─────────────────────────────────────────────
      // ASSIGN
      // ─────────────────────────────────────────────

      if (assignTo && assignTo !== this.ticket.assignedTo?.publicId) {
        await firstValueFrom(this.ticketService.assignTicket(this.ticket.publicId, assignTo));

        this.ticket.assignedTo = this.assignTo.find((t) => t.publicId === assignTo) ?? undefined;

        this.canManageTicket =
          !this.ticket.assignedTo || this.ticket.assignedTo.publicId === this.currentUserPublicId;

        this.updateFormState();
      }
      // ─────────────────────────────────────────────
      // MESSAGE
      // ─────────────────────────────────────────────

      if (comment?.trim()) {
        const msg = await firstValueFrom(
          this.ticketService.sendMessage(this.ticket.publicId, comment),
        );

        this.messages = [...this.messages, msg];

        this.form.get('comment')?.setValue('');

        this.commentLength = 0;

        this.clearCommentArea();

        this.shouldScrollToBottom = true;
      }

      await this.showToast('Ticket updated successfully.', 'success');
    } catch (error) {
      console.error(error);

      await this.showToast('Failed to update ticket.', 'danger');
    } finally {
      this.isSubmitting = false;

      await loading.dismiss();
    }
  }

  async onCloseTicket(): Promise<void> {
    await this.showToast('Feature under development.', 'warning');
  }

  onCommentInput(event: Event): void {
    // ← movido para dentro da classe
    const el = event.target as HTMLElement;
    const text = el.innerText ?? '';
    this.commentLength = text.length;
    this.form.get('comment')?.setValue(text);
  }

  // ── Private ──────────────────────────────────────────────────────────

  private buildForm(): void {
    this.form = this.fb.group({
      status: [null],
      priority: [null],
      assignTo: [null],
      comment: [''],
    });
  }
  private async loadTicketData(): Promise<void> {
    const publicId = this.route.snapshot.paramMap.get('publicId');

    if (!publicId) {
      await this.showToast('Invalid ticket ID.', 'danger');
      return;
    }

    const currentUser = await this.tokenStorage.getToken();

    if (!currentUser) {
      await this.showToast('User not authenticated.', 'danger');
      return;
    }

    const decoded = jwtDecode<JwtPayload>(currentUser);
    this.currentUserName = decoded.name;
    this.currentUserPublicId = decoded.sub;

    this.ticketPublicId = publicId;

    this.ticketService.findTicketById(publicId).subscribe({
      next: (data) => {
        this.ticket = data;

        this.canManageTicket =
          !data.assignedTo || data.assignedTo.publicId === this.currentUserPublicId;

        this.form.patchValue({
          status: data.status,
          priority: data.priority,
          assignTo: data.assignedTo ?? null,
        });

        this.updateFormState();

        this.loadMessages(data.publicId);
      },
      error: () => {
        this.showToast('Failed to load ticket data.', 'danger');
      },
    });
  }

  private async loadTechnicians(): Promise<void> {
    this.assignTo = await firstValueFrom(this.ticketService.getTechnicians());
  }

  private scrollToBottom(): void {
    this.chatContent?.scrollToBottom(300);
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'top',
    });
    await toast.present();
  }

  async sendMessageTicket(): Promise<void> {
    const comment = this.form.get('comment')?.value?.trim();

    if (!comment) {
      await this.showToast('Escreva uma mensagem antes de enviar.', 'warning');
      return;
    }

    if (!this.ticket) return;

    const token = await this.tokenStorage.getToken();
    if (!token) {
      await this.showToast('User not authenticated.', 'danger');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Enviando mensagem...' });
    await loading.present();

    this.ticketService.sendMessage(this.ticket.publicId, comment).subscribe({
      next: (msg) => {
        this.messages = [...this.messages, msg];
        this.form.get('comment')?.setValue('');
        this.commentLength = 0;
        this.clearCommentArea();
        this.shouldScrollToBottom = true;
        loading.dismiss();
        this.showToast('Mensagem enviada.', 'success');
      },
      error: () => {
        loading.dismiss();
        this.showToast('Falha ao enviar mensagem.', 'danger');
      },
    });
  }

  private clearCommentArea(): void {
    if (this.commentAreaRef?.nativeElement) {
      this.commentAreaRef.nativeElement.innerText = '';
    }
  }

  private updateFormState(): void {
    if (this.canManageTicket) {
      this.form.get('status')?.enable();
      this.form.get('priority')?.enable();
      this.form.get('assignTo')?.enable();
    } else {
      this.form.get('status')?.disable();
      this.form.get('priority')?.disable();
      this.form.get('assignTo')?.disable();
    }
  }

  private loadMessages(ticketId: string): void {
    this.ticketService.getMessages(ticketId).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.shouldScrollToBottom = true;
      },

      error: () => {
        this.showToast('Failed to load messages.', 'danger');
      },
    });
  }
}
