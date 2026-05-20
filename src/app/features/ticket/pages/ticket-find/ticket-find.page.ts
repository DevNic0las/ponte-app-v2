// src/app/features/ticket/ticket-find/ticket-find.page.ts

import {
  Component,
  OnInit,
  AfterViewChecked, // ← adicionado
  ViewChild, // ← adicionado
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  IonButton, // ← adicionado
  IonIcon, // ← adicionado
  IonFooter, // ← adicionado (usado no template)
  IonGrid, // ← adicionado (usado no template)
  IonRow, // ← adicionado (usado no template)
  IonCol, // ← adicionado (usado no template)
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  personOutline, // ← adicionado
  checkmarkCircleOutline,
  closeCircleOutline, // ← adicionado
} from 'ionicons/icons';

import { TicketService } from '../../services/ticket.service';
import { TicketPriority, TicketResponse } from '../../models/ticket.model';
import { TicketMessage } from '../../models/ticket-message.model';
import { TicketStatusPipe, TicketStatusColorPipe } from '../../pipe/ticket-status.pipe';

// ── Tipos locais ─────────────────────────────────────────────────────
interface SelectOption {
  label: string;
  value: string;
}

interface PriorityOption {
  label: string;
  value: TicketPriority;
}

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
    IonButton, // ← adicionado
    IonIcon, // ← adicionado
    IonFooter, // ← adicionado
    IonGrid, // ← adicionado
    IonRow, // ← adicionado
    IonCol, // ← adicionado
  ],
})
export class TicketFindPage implements OnInit, AfterViewChecked {
  // ── DI ──────────────────────────────────────────────────────────────
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);

  // ── ViewChild ────────────────────────────────────────────────────────
  @ViewChild('chatContent') private chatContent!: IonContent;

  // ── State ────────────────────────────────────────────────────────────
  ticket: TicketResponse | null = null;
  messages: TicketMessage[] = [];
  isSubmitting = false;
  private shouldScrollToBottom = false;
  private ticketPublicId = ''; // guardado para usar na chave do storage

  // ── Select options ───────────────────────────────────────────────────

  readonly priorities: PriorityOption[] = [
    { label: 'Baixo', value: 'LOW' },
    { label: 'Médio', value: 'MEDIUM' },
    { label: 'Alto', value: 'HIGH' },
    { label: 'Crítico', value: 'CRITICAL' },
  ];

  readonly assignOptions: SelectOption[] = [
    { label: 'Level 2 Support', value: 'SUPPORT_L2' },
    { label: 'Backend Development', value: 'DEV_BACKEND' },
    { label: 'Infrastructure', value: 'INFRA' },
    { label: 'Financial', value: 'FINANCIAL' },
    { label: 'Hardware Analysis', value: 'HARDWARE_ANALYSIS' },
    { label: 'Network Analysis', value: 'NETWORK_ANALYSIS' },
    { label: 'On-site Visit', value: 'ONSITE_VISIT' },
  ];

  readonly statusOptions: SelectOption[] = [
    { label: 'Aberto', value: 'OPEN' },
    { label: 'Em Andamento', value: 'IN_PROGRESS' },
    { label: 'Em Análise', value: 'IN_ANALYSIS' },
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
    });
  }

  // ── Lifecycle ────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.buildForm();
    this.loadTicketData();
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

    const loading = await this.loadingCtrl.create({ message: 'Sending update...' });
    await loading.present();

    this.isSubmitting = true;
    try {
      const { priority, assignTo } = this.form.value;

      await this.ticketService.assignPriority(this.ticket.publicId, priority);

      if (assignTo) {
        await this.ticketService.assignTicket(this.ticket.publicId);
        // ↑ passe assignTo se o service aceitar — verifique a assinatura
      }

      await this.showToast('Ticket updated successfully.', 'success');
    } catch {
      await this.showToast('Failed to update ticket. Please try again.', 'danger');
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  async onCloseTicket(): Promise<void> {
    await this.showToast('Feature under development.', 'warning');
  }

  // ── Private ──────────────────────────────────────────────────────────

  private buildForm(): void {
    this.form = this.fb.group({
      status: [null, Validators.required],
      priority: [null, Validators.required],
      assignTo: [null], // optional per TicketUpdatePayload
    });
  }

  private loadTicketData(): void {
    const publicId = this.route.snapshot.paramMap.get('publicId');
    if (!publicId) {
      this.showToast('Invalid ticket ID.', 'danger');
      return;
    }

    this.ticketPublicId = publicId;

    this.ticketService.findTicketById(publicId).subscribe({
      next: (data) => {
        this.ticket = data;
        this.form.patchValue({
          status: data.status,
          priority: data.priority,
          assignTo: data.assignedTo ?? null,
        });
      },
      error: () => this.showToast('Failed to load ticket data.', 'danger'),
    });

    // ✅ remova this.loadMessages() até implementar de verdade
    // this.messages = [];
    this.shouldScrollToBottom = true;
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
}
