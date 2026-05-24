export interface TicketCard {
  icon: string;
  title: string;
  subtitle: string;
  route: string;
  queryParams?: Record<string, string>;
}
