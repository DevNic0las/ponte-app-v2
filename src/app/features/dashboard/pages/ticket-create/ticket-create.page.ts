import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { BottomNavComponent } from 'src/app/shared/components/bottom-nav/bottom-nav.component';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  chevronDownOutline,
  homeOutline,
  ticketOutline,
  barChartOutline,
  personOutline,
} from 'ionicons/icons';

// ----------------------------------------------------------------
// Modelo do formulário — tipagem estrita
// ----------------------------------------------------------------
interface TicketForm {
  colaborador: string;
  numero: string;
  departamento: string;
  item: string;
  periferico: string;
  setor: string;
  descricao: string;
}

// ----------------------------------------------------------------
// Mapa de itens por departamento — lógica dinâmica
// ----------------------------------------------------------------
const ITENS_POR_DEPARTAMENTO: Record<string, string[]> = {
  Hardware: ['Computador/Notebook', 'Periférico'],
  Software: ['Sistema Operacional', 'Aplicativo', 'Licença'],
  Rede: ['Conectividade', 'VPN', 'Wi-Fi'],
};

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.page.html',
  styleUrls: ['./ticket-create.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonTextarea,
    IonSpinner,
    IonTabBar,
    IonTabButton,
    IonLabel,
    BottomNavComponent,
  ],
})
export class TicketCreatePage implements OnInit {
  // ----------------------------------------------------------------
  // Estado do formulário
  // ----------------------------------------------------------------
  form: TicketForm = {
    colaborador: '',
    numero: '',
    departamento: '',
    item: '',
    periferico: '',
    setor: '',
    descricao: '',
  };

  isLoading = false;

  // ----------------------------------------------------------------
  // Dados estáticos (futuramente virão de um TicketOptionsService)
  // ----------------------------------------------------------------
  readonly colaboradores: string[] = ['Ana Silva', 'Bruno Costa', 'Carla Mendes'];

  readonly departamentos: string[] = Object.keys(ITENS_POR_DEPARTAMENTO);

  readonly perifericos: string[] = ['Mouse', 'Teclado', 'Headset', 'Webcam'];

  readonly setores: string[] = ['TI', 'Financeiro', 'Operações'];

  // Lista de itens filtrada pelo departamento selecionado
  itensDoDepartamento: string[] = [];

  // Controla visibilidade do campo Periférico
  get showPeriferico(): boolean {
    return this.form.item === 'Periférico';
  }

  // ----------------------------------------------------------------
  // Injeção de dependências
  // ----------------------------------------------------------------
  private readonly navCtrl = inject(NavController);

  constructor() {
    addIcons({
      arrowBackOutline,
      chevronDownOutline,
      homeOutline,
      ticketOutline,
      barChartOutline,
      personOutline,
    });
  }

  ngOnInit(): void {
    // Pré-carrega itens do primeiro departamento
    this.itensDoDepartamento = ITENS_POR_DEPARTAMENTO[this.departamentos[0]] ?? [];
  }

  // ----------------------------------------------------------------
  // Handlers de mudança
  // ----------------------------------------------------------------

  /**
   * Quando o departamento muda:
   * - Atualiza a lista de itens disponíveis
   * - Reseta item e periférico para evitar valores inconsistentes
   */
  onDepartamentoChange(): void {
    this.itensDoDepartamento = ITENS_POR_DEPARTAMENTO[this.form.departamento] ?? [];
    this.form.item = '';
    this.form.periferico = '';
  }

  /**
   * Quando o item muda:
   * - Limpa periférico se o novo item não for "Periférico"
   */
  onItemChange(): void {
    if (!this.showPeriferico) {
      this.form.periferico = '';
    }
  }

  // ----------------------------------------------------------------
  // Navegação
  // ----------------------------------------------------------------
  goBack(): void {
    this.navCtrl.back();
  }

  // ----------------------------------------------------------------
  // Submit
  // ----------------------------------------------------------------

  /**
   * Valida e envia o formulário.
   * A lógica de chamada à API deve ser movida para um TicketService.
   *
   * TODO: injetar TicketService e chamar ticketService.create(payload)
   */
  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      // TODO: substituir por ToastService centralizado
      console.warn('Formulário inválido. Preencha todos os campos obrigatórios.');
      return;
    }

    this.isLoading = true;

    try {
      const payload = this.buildPayload();
      console.log('Payload do chamado:', payload);

      // TODO: await this.ticketService.create(payload);
      // Simula delay de rede para demonstração
      await this.simulateApiCall();

      this.navCtrl.back();
    } catch (error) {
      console.error('Erro ao criar chamado:', error);
      // TODO: exibir toast de erro via ToastService
    } finally {
      this.isLoading = false;
    }
  }

  // ----------------------------------------------------------------
  // Helpers privados
  // ----------------------------------------------------------------

  private isFormValid(): boolean {
    const { colaborador, departamento, item, setor, descricao } = this.form;

    const baseValido = !!colaborador && !!departamento && !!item && !!setor && !!descricao.trim();

    // Se o item selecionado exige periférico, ele também é obrigatório
    if (this.showPeriferico) {
      return baseValido && !!this.form.periferico;
    }

    return baseValido;
  }

  private buildPayload() {
    return {
      colaborador: this.form.colaborador,
      numero: this.form.numero || null,
      departamento: this.form.departamento,
      item: this.form.item,
      periferico: this.showPeriferico ? this.form.periferico : null,
      setor: this.form.setor,
      descricao: this.form.descricao.trim(),
    };
  }
  private simulateApiCall(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1500));
  }
}
