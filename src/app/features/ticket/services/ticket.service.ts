import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Category,
  Sector,
  Subcategory,
  TicketRequest,
  TicketResponse,
  TicketStatus,
  TicketUpdatePayload,
} from '../models/ticket.model';
import { TicketMessage } from '../models/ticket-message.model';
import { UserProfile } from '../../profile/models/profile.model';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly apiUrl = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  createTicket(payload: TicketRequest): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.apiUrl}/tickets`, payload);
  }

  listTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.apiUrl}/tickets`);
  }

  findTicketById(id: string): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.apiUrl}/tickets/${id}`);
  }

  updateTicket(id: string, payload: TicketUpdatePayload): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(`${this.apiUrl}/tickets/${id}`, payload);
  }

  deleteTicket(id: string): Observable<TicketResponse> {
    return this.http.delete<TicketResponse>(`${this.apiUrl}/tickets/${id}`);
  }

  assignTicket(id: string, newUser: string): Observable<TicketResponse> {
    return this.http.patch<TicketResponse>(
      `${this.apiUrl}/tickets/${id}/assign?newUser=${newUser}`,
      null,
    );
  }

  assignPriority(id: string, priority: TicketPriority): Observable<TicketResponse> {
    return this.http.patch<TicketResponse>(
      `${this.apiUrl}/tickets/${id}/assign/priority?priority=${priority}`,
      {
        priority,
      },
    );
  }
  assignStatus(ticketId: string, status: TicketStatus): Observable<TicketResponse> {
    return this.http.patch<TicketResponse>(
      `${this.apiUrl}/tickets/${ticketId}/assign/status?status=${status}`,
      {
        status,
      },
    );
  }

  closeTicket(id: string): Observable<TicketResponse> {
    return this.http.patch<TicketResponse>(`${this.apiUrl}/tickets/${id}/close`, null);
  }

  listDeletedTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.apiUrl}/tickets/deleted`);
  }

  findDeletedTicketById(id: string): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.apiUrl}/tickets/deleted/${id}`);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category`);
  }
  getSubcategories(subcategoryPublicId: string): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.apiUrl}/subcategory/${subcategoryPublicId}`);
  }
  getSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.apiUrl}/sectors`);
  }
  getMessages(ticketId: string): Observable<TicketMessage[]> {
    return this.http.get<TicketMessage[]>(`${this.apiUrl}/messages/${ticketId}`);
  }
  sendMessage(ticketId: string, content: string): Observable<TicketMessage> {
    return this.http.post<TicketMessage>(`${this.apiUrl}/messages/${ticketId}`, {
      content,
    });
  }
  getTechnicians(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}/users/technicians`);
  }
  softDeleteTicket(id: string): Observable<TicketResponse> {
    return this.http.patch<TicketResponse>(`${this.apiUrl}/tickets/${id}/close`, null);
  }
  listTicketsByStatus(status: TicketStatus): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.apiUrl}/tickets/status?status_ticket=${status}`);
  }
}
