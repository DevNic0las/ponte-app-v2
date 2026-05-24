import { Component, OnInit, inject, signal, computed, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  search,
  home,
  ticket,
  barChart,
  person,
  optionsOutline,
  chevronDownOutline,
  checkmarkOutline,
  alertCircleOutline,
  folderOpenOutline,
} from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';
import { TicketService } from '../../services/ticket.service';
import { TicketResponse, TicketStatus } from '../../models/ticket.model';
import { TicketListCardComponent } from '../../../../shared/components/ticket-list-card/ticket-list-card.component';
import { BottomNavComponent } from 'src/app/shared/components/bottom-nav/bottom-nav.component';

export interface FilterOption {
  value: string;
  label: string;
  color: string;
  ring: string;
}

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonSpinner,
    TicketListCardComponent,
    BottomNavComponent,
  ],
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
})
export class TicketListPage implements OnInit {
  @ViewChild('filterWrapper') filterWrapper!: ElementRef;

  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  // 'all' = todos os tickets (técnico), 'my' = só os do usuário logado (solicitante)
  mode = inject(ActivatedRoute).snapshot.queryParamMap.get('mode') || 'all';

  tickets = signal<TicketResponse[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);
  isFilterOpen = false;
  activeFilter = signal<string>(
    inject(ActivatedRoute).snapshot.queryParamMap.get('status') || 'all',
  );

  filterOptions: FilterOption[] = [
    { value: 'all', label: 'Todos', color: '#a1a1aa', ring: 'rgba(161,161,170,0.2)' },
    { value: 'OPEN', label: 'Novos Chamados', color: '#10B981', ring: 'rgba(16,185,129,0.15)' },
    {
      value: 'IN_PROGRESS',
      label: 'Chamados em Atendimento',
      color: '#3B82F6',
      ring: 'rgba(59,130,246,0.15)',
    },
    {
      value: 'RESOLVED',
      label: 'Chamados Resolvidos',
      color: '#F59E0B',
      ring: 'rgba(245,158,11,0.15)',
    },
    { value: 'CLOSED', label: 'Fechados', color: '#6b7280', ring: 'rgba(107,114,128,0.15)' },
  ];

  filteredTickets = computed(() => this.tickets());

  getActiveLabel(): string {
    return this.filterOptions.find((f) => f.value === this.activeFilter())?.label ?? 'Filtrar';
  }

  constructor() {
    addIcons({
      arrowBack,
      search,
      home,
      ticket,
      barChart,
      person,
      optionsOutline,
      chevronDownOutline,
      checkmarkOutline,
      alertCircleOutline,
      folderOpenOutline,
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  public loadTickets(): void {
    this.isLoading.set(true);
    this.error.set(null);

    const status = this.activeFilter();
    const isMyMode = this.mode === 'my';

    let request$;

    if (isMyMode) {
      request$ =
        status === 'all'
          ? this.ticketService.findMyTickets()
          : this.ticketService.findMyTicketsByStatus(status as TicketStatus);
    } else {
      request$ =
        status === 'all'
          ? this.ticketService.listTickets()
          : this.ticketService.listTicketsByStatus(status as TicketStatus);
    }

    request$.subscribe({
      next: (data) => {
        this.tickets.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar chamados:', err);
        this.error.set('Não foi possível carregar os chamados. Tente novamente.');
        this.isLoading.set(false);
      },
    });
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isFilterOpen = !this.isFilterOpen;
  }

  setFilter(value: string): void {
    this.activeFilter.set(value);
    this.isFilterOpen = false;
    this.loadTickets();
  }

  onContentClick(event: MouseEvent): void {
    if (this.isFilterOpen) {
      const wrapper = this.filterWrapper?.nativeElement as HTMLElement;
      if (!wrapper?.contains(event.target as Node)) {
        this.isFilterOpen = false;
      }
    }
  }

  trackByTicketId(_index: number, ticket: TicketResponse): string {
    return ticket.publicId;
  }

  onTicketSelected(ticket: TicketResponse): void {
    this.router.navigate(['/tickets/find', ticket.publicId]);
  }
}
