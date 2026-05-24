import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TicketCount } from '../models/dashboard-home/ticket-count.interface';
import { RegisterRequest } from 'src/app/features/auth/models/auth.interface';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly prefix = 'tickets';
  private readonly apiUrl = environment.apiUrl;

  private readonly http: HttpClient = inject(HttpClient);

  countTicketsByStatus(): Observable<TicketCount> {
    return this.http.get<TicketCount>(`${this.apiUrl}/${this.prefix}/summary`);
  }
  registerUser(userData: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${this.apiUrl}/auth/register`, userData);
  }
}
