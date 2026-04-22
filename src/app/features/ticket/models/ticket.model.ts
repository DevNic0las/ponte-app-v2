export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TicketRequest {
  title: string;
  description?: string;
  priority: TicketPriority;
  categoryId?: string;
}

export interface TicketResponse {
  id: string;
  title: string;
  description?: string;
  priority: TicketPriority;
  categoryId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
