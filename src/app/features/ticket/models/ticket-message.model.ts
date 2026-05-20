export type MessageSender = 'USER' | 'ADMIN';

export interface TicketMessage {
  id: number;
  content: string;
  sender: MessageSender;
  timestamp: string;
}
