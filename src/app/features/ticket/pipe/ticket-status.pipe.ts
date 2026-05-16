import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketStatus',
  standalone: true,
})
export class TicketStatusPipe implements PipeTransform {
  transform(status: string | undefined): string {
    const map: Record<string, string> = {
      NOVO: 'Novo',
      EM_ABERTO: 'Em Aberto',
      EM_ANALISE: 'Em Análise',
      FINALIZADO: 'Finalizado',
    };
    return map[status ?? ''] ?? status ?? '';
  }
}

@Pipe({
  name: 'ticketStatusColor',
  standalone: true,
})
export class TicketStatusColorPipe implements PipeTransform {
  transform(status: string | undefined): string {
    const map: Record<string, string> = {
      NOVO: 'success',
      EM_ABERTO: 'warning',
      EM_ANALISE: 'primary',
      FINALIZADO: 'medium',
    };
    return map[status ?? ''] ?? 'medium';
  }
}