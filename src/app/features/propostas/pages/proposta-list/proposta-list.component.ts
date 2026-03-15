import { Component, OnInit } from '@angular/core';
import { PropostaService } from '../../../../core/services/proposta.service';
import { PropostaResponse } from '../../../../core/models/proposta.model';

@Component({
  selector: 'app-proposta-list',
  templateUrl: './proposta-list.component.html',
  styleUrls: ['./proposta-list.component.scss'],
  standalone: false,
})
export class PropostaListComponent implements OnInit {
  propostas: PropostaResponse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private propostaService: PropostaService) {}

  ngOnInit(): void {
    this.carregarPropostas();
  }

  carregarPropostas(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.propostaService.listarPropostas().subscribe({
      next: (data) => {
        this.propostas = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }
}
