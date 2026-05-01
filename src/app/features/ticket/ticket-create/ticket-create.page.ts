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
import { Category, Subcategory, TicketRequest } from '../models/ticket.model';
import { environment } from 'src/environments/environment';
import { TicketService } from '../services/ticket.service';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class TicketCreatePage implements OnInit {
  private readonly apiUrl = environment.apiUrl;

  categories$!: Observable<Category[]>;

  private categoryChange$ = new Subject<string>();

  subcategories: Subcategory[] = []; // lista local pra consultar

  subcategories$ = this.categoryChange$.pipe(
    switchMap((categoryId) => this.ticketService$.getSubcategories(categoryId)),
    tap((subs) => (this.subcategories = subs)), // guarda localmente
  );
  peripheral: string[] = ['Mouse', 'Teclado', 'Monitor', 'Impressora', 'Outro'];

  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['MEDIUM', Validators.required],
    categoryId: ['', Validators.required], // só UI
    subcategoryId: ['', Validators.required],
    sector: ['', Validators.required],
  });
  isLoading = false;

  selectedItemName: boolean = false;

  get showPeriferico(): boolean {
    return this.selectedItemName === true;
  }

  // ----------------------------------------------------------------
  // Injeção de dependências
  // ----------------------------------------------------------------
  private readonly navCtrl = inject(NavController);
  private readonly ticketService$ = inject(TicketService);
  private readonly toastService$ = inject(ToastService);

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
    this.categories$ = this.ticketService$.getCategories();

    this.form.get('categoryId')!.valueChanges.subscribe((categoryId) => {
      this.form.get('subcategoryId')!.setValue('');
      this.categoryChange$.next(categoryId);
    });

    this.form.get('subcategoryId')!.valueChanges.subscribe((id) => {
      if (id) this.onSubcategoryChange(id);
    });
  }

  // ----------------------------------------------------------------
  // Handlers de mudança
  // ----------------------------------------------------------------

  /**
   * Quando o departamento muda:
   * - Atualiza a lista de itens disponíveis
   * - Reseta item e periférico para evitar valores inconsistentes
   */

  onDepartamentoChange(categoryId: string): void {
    this.form.get('subcategoryId')?.setValue('');
    this.categoryChange$.next(categoryId);
  }

  onSubcategoryChange(publicId: string): void {
    const item = this.subcategories.find((s) => s.publicId === publicId);

    this.selectedItemName = item?.hasPeripheral ?? false;
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
  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService$.error('Formulário inválido');
      return;
    }

    const payload: TicketRequest = this.form.getRawValue();

    try {
      this.isLoading = true;
      this.ticketService$.createTicket(payload);
      this.toastService$.success('Chamado criado com sucesso');
      // this.navCtrl.back();
    } catch (error) {
      console.error('Erro ao criar chamado', error);
      this.toastService$.error('Erro ao criar chamado');
    } finally {
      this.isLoading = false;
    }
  }
}
