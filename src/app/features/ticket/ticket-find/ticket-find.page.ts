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

import { TicketService } from '../services/ticket.service';
import { TicketPriority, TicketResponse, TicketUpdatePayload } from '../models/ticket.model';
import { TicketMessage } from '../models/ticket-message.model';
import { TicketStatusPipe, TicketStatusColorPipe } from '../pipe/ticket-status.pipe';

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
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
    { label: 'Critical', value: 'CRITICAL' },
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
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'In Analysis', value: 'IN_ANALYSIS' },
    { label: 'Closed', value: 'CLOSED' },
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

  // ── Public helpers ───────────────────────────────────────────────────

  isUserMessage(msg: TicketMessage): boolean {
    return msg.sender === 'USER';
  }

  // ── Actions ──────────────────────────────────────────────────────────

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Sending update...',
    });
    await loading.present();
    this.isSubmitting = true;

    try {
      const payload = this.buildPayload();
      await this.ticketService.updateTicket(this.ticket!.publicId, payload);

      const statusLabel =
        this.statusOptions.find((s) => s.value === payload.status)?.label ?? payload.status;

      const newMessage: TicketMessage = {
        id: Date.now(),
        content: `Status updated to: ${statusLabel}`,
        sender: 'ADMIN',
        timestamp: this.getCurrentTime(),
      };

      this.messages.push(newMessage);
      this.saveMessages(); // ← persiste no localStorage

      this.shouldScrollToBottom = true;
      this.form.reset();
      await this.showToast('Update sent successfully!', 'success');
    } catch {
      await this.showToast('Failed to send update. Please try again.', 'danger');
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  async onCloseTicket(): Promise<void> {
    // TODO: AlertController confirmation + ticketService.closeTicket()
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
      },
      error: () => {
        this.showToast('Failed to load ticket data.', 'danger');
      },
    });

    // Carrega mensagens do localStorage ou usa as iniciais
    this.messages = this.loadMessages();
    this.shouldScrollToBottom = true;
  }

  private buildPayload(): TicketUpdatePayload {
    const { status, priority, assignTo } = this.form.value;
    return {
      status,
      priority: priority as TicketPriority,
      ...(assignTo ? { assignTo } : {}),
    };
  }

  // ── localStorage ─────────────────────────────────────────────────────

  private storageKey(): string {
    return `ticket_messages_${this.ticketPublicId}`;
  }

  private loadMessages(): TicketMessage[] {
    try {
      const stored = localStorage.getItem(this.storageKey());
      if (stored) {
        return JSON.parse(stored) as TicketMessage[];
      }
    } catch {
      // JSON corrompido — ignora e usa as mensagens iniciais
    }
    return this.initialMessages();
  }

  private saveMessages(): void {
    try {
      localStorage.setItem(this.storageKey(), JSON.stringify(this.messages));
    } catch {
      // localStorage cheio ou indisponível — falha silenciosa
    }
  }

  private initialMessages(): TicketMessage[] {
    return [
      {
        id: 1,
        content:
          'SUPPORT TICKET - IT\n\nTitle: COMPUTER NOT TURNING ON\nType: New Ticket - IT\n\nREQUESTER INFO\nName: Ricardo Silva\nPhone: 08198189420\n\nPROBLEM DETAILS\nCategory: Computer & Peripherals\nSubcategory: Computer/Notebook failure\nFailure type: Does not turn on',
        sender: 'USER',
        timestamp: '09:15 AM',
      },
      {
        id: 2,
        content:
          'Good morning, Ricardo. We are already reviewing your request with the engineering team. We will get back to you shortly.',
        sender: 'ADMIN',
        timestamp: '09:22 AM',
      },
    ];
  }

  // ── Utilities ────────────────────────────────────────────────────────

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
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
