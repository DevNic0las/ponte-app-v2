export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'PENDING';
export interface TicketRequest {
  title: string;
  description: string;
  subcategory: string;
  sector: string;
}
export interface RequestedBy {
  name: string;
  email: string;
}
export interface TicketResponse {
  publicId: string;
  title: string;
  description: string;
  priority: TicketPriority;
  subcategoryId: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  assignedTo?: string;
  requestedBy: RequestedBy;
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

export interface TicketStatusConfig {
  label: string;
  accentColor: string;
  badgeCssClass: string;
}

export const TICKET_STATUS_CONFIG: Record<TicketStatus, TicketStatusConfig> = {
  OPEN: { label: 'Novo Chamado', accentColor: '#10B981', badgeCssClass: 'badge--new' },
  IN_PROGRESS: {
    label: 'Em Atendimento',
    accentColor: '#3B82F6',
    badgeCssClass: 'badge--progress',
  },
  RESOLVED: { label: 'Resolvido', accentColor: '#22C55E', badgeCssClass: 'badge--resolved' },
  PENDING: { label: 'Planejado', accentColor: '#F59E0B', badgeCssClass: 'badge--planned' },
  CLOSED: { label: 'Encerrado', accentColor: '#6B7280', badgeCssClass: 'badge--closed' },
};
