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
import { Category, Sector, Subcategory, TicketRequest } from '../../models/ticket.model';
import { environment } from 'src/environments/environment';
import { TicketService } from '../../services/ticket.service';
import { firstValueFrom, Observable, Subject, switchMap, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserProfile } from 'src/app/features/profile/models/profile.model';
import { AuthService } from 'src/app/features/auth/services/extractRole.service';
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
  private readonly ticketService$ = inject(TicketService);
  private readonly navCtrl = inject(NavController);
  private readonly toastService$ = inject(ToastService);
  private readonly authService = inject(AuthService);
  categories$!: Observable<Category[]>;

  private categoryChange$ = new Subject<string>();

  subcategories: Subcategory[] = []; // lista local pra consultar

  sectors: Sector[] = []; // lista local pra consultar

  requestedBy: UserProfile[] = [];
  isAdmin = false;
  subcategories$ = this.categoryChange$.pipe(
    switchMap((categoryId) => this.ticketService$.getSubcategories(categoryId)),
    tap((subs) => (this.subcategories = subs)), // guarda localmente
  );
  sectors$ = this.ticketService$.getSectors().pipe(tap((sectors) => (this.sectors = sectors)));
  peripheral: string[] = ['Mouse', 'Teclado', 'Monitor', 'Impressora', 'Outro'];

  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    subcategory: ['', Validators.required],
    sector: ['', Validators.required],
    category: ['', Validators.required],
    requestedBy: ['', Validators.required],
  });
  isLoading = false;

  selectedItemName: boolean = false;

  get showPeriferico(): boolean {
    return this.selectedItemName === true;
  }

  // ----------------------------------------------------------------
  // Injeção de dependências
  // ----------------------------------------------------------------

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

    this.form.get('category')!.valueChanges.subscribe((categoryId) => {
      this.form.get('subcategory')!.setValue('');
      this.categoryChange$.next(categoryId);
    });

    this.form.get('subcategory')!.valueChanges.subscribe((id) => {
      if (id) this.onSubcategoryChange(id);
    });
    this.ticketService$.getAllRequesters().subscribe((requesters) => {
      this.requestedBy = requesters;
    });
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      const control = this.form.get('requestedBy');
      if (isAdmin) {
        control?.setValidators(Validators.required);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
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
    this.form.get('subcategory')?.setValue('');
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

    const { title, description, sector, subcategory, requestedBy } = this.form.getRawValue();
    const payload: TicketRequest = { title, description, sector, subcategory, requestedBy };

    try {
      this.isLoading = true;
      await firstValueFrom(this.ticketService$.createTicket(payload));
      this.toastService$.success('Chamado criado com sucesso');
      this.navCtrl.back();
    } catch (error) {
      console.error('Erro ao criar chamado', error);
      this.toastService$.error('Erro ao criar chamado');
    } finally {
      this.isLoading = false;
    }
  }
}
