import { Component, Input } from '@angular/core';
import { PropostaResponse } from '../../../../core/models/proposta.model';

@Component({
  selector: 'app-proposta-table',
  templateUrl: './proposta-table.component.html',
  styleUrls: ['./proposta-table.component.scss'],
  standalone: false,
})
export class PropostaTableComponent {
  @Input() propostas: PropostaResponse[] = [];

  getStatus(proposta: PropostaResponse): string {
    if (proposta.observacao) return proposta.observacao;
    return proposta.aprovada ? 'Aprovada' : 'Em análise';
  }
}
