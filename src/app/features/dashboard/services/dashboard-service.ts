import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { TicketCount } from '../models/dashboard-home/ticket-count.interface';
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
}
