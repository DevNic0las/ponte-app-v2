export type MessageSender = 'REQUESTER' | 'TECHNICIAN';

export interface TicketMessage {
  publicId: string;
  senderType: MessageSender;
  content: string;
  createdAt: string;
  isRead: boolean;
  senderId: number;
  ticketId: number;
}
