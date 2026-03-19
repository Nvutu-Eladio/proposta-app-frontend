import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { PropostaService } from '../../../../core/services/proposta.service';
import { PropostaResponse } from '../../../../core/models/proposta.model';

@Component({
  selector: 'app-proposta-list',
  templateUrl: './proposta-list.component.html',
  styleUrls: ['./proposta-list.component.scss'],
  standalone: false,
})
export class PropostaListComponent implements OnInit, OnDestroy {
  propostas: PropostaResponse[] = [];
  errorMessage = '';
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private propostaService: PropostaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPropostas();
    this.refreshInterval = setInterval(() => this.carregarPropostas(), 5000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  carregarPropostas(): void {
    this.errorMessage = '';

    this.propostaService.listarPropostas().subscribe({
      next: (data) => {
        this.propostas = data;
        this.cdr.markForCheck();
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.cdr.markForCheck();
      },
    });
  }
}
