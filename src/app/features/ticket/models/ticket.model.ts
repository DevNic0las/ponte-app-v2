export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TicketRequest {
  title: string;
  description: string;
  subcategory: string;
  sector: string;
}

export interface TicketUpdatePayload {
  priority: TicketPriority;
  status: string;
  assignTo?: string;
}

export interface TicketResponse {
  publicId: string;
  title: string;
  description: string;
  priority: TicketPriority;
  requesterName: string;
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

export interface Sector {
  name: string;
  publicId: string;
}
