export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TicketRequest {
  title: string;
  description: string;
  subcategoryId: string;
  priority: string;
  sector: string;
}

export interface TicketResponse {
  publicId: string;
  title: string;
  description: string;
  priority: TicketPriority;
  subcategoryId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Category {
  publicId: string;
  name: string;
}

export interface Subcategory {
  publicId: string;
  name: string;
  hasPeripheral: boolean;
}
