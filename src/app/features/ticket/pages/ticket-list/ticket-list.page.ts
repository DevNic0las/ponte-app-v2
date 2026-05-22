import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, optionsOutline, chevronDownOutline, homeOutline, receiptOutline, personOutline } from 'ionicons/icons';

interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  status: 'novo' | 'atendimento' | 'planejado';
  statusLabel: string;
  usuarioNome: string;
  usuarioIniciais: string;
  data: string;
}

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TicketManagementPage implements OnInit {
  filtroAtual: string = 'todos';
  
  chamados: Chamado[] = [
    {
      id: 1,
      titulo: 'COMPUTADOR SEM LIGAR',
      descricao: 'Computador não liga, já tentei de tudo e o mesmo não quer ligar',
      status: 'novo',
      statusLabel: 'Novos Chamados',
      usuarioNome: 'Ricardo Mendonça',
      usuarioIniciais: 'RM',
      data: '10/10/2023 • 09:45'
    }
  ];

  chamadosFiltrados: Chamado[] = [];

  constructor() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'options-outline': optionsOutline,
      'chevron-down-outline': chevronDownOutline,
      'home-outline': homeOutline,
      'receipt-outline': receiptOutline,
      'person-outline': personOutline
    });
  }

  ngOnInit() {
    this.filtrarChamados('todos');
  }

  filtrarChamados(status: string) {
    this.filtroAtual = status;
    if (status === 'todos') {
      this.chamadosFiltrados = [...this.chamados];
    } else {
      this.chamadosFiltrados = this.chamados.filter(c => c.status === status);
    }
  }

  limparFiltros() {
    this.filtrarChamados('todos');
  }
}