import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { PropostaListComponent } from './proposta-list.component';
import { PropostaService } from '../../../../core/services/proposta.service';
import { RouterModule } from '@angular/router';
import { PropostaResponse } from '../../../../core/models/proposta.model';
import { CpfFormatPipe } from '../../../../shared/pipes/cpf-format.pipe';

const mockPropostas: PropostaResponse[] = [
  {
    id: '1',
    nome: 'João',
    sobreNome: 'Silva',
    telefone: '11999999999',
    cpf: '12345678901',
    renda: 5000,
    valorSolicitadoFmt: 'R$ 10.000,00',
    prazoPagamento: 12,
    aprovada: false,
    observacao: 'Em análise',
    integrada: false,
  },
];

describe('PropostaListComponent', () => {
  let component: PropostaListComponent;
  let fixture: ComponentFixture<PropostaListComponent>;
  let listarPropostasMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    listarPropostasMock = vi.fn(() => of(mockPropostas));
    const propostaServiceStub = { listarPropostas: listarPropostasMock };

    await TestBed.configureTestingModule({
      declarations: [PropostaListComponent, CpfFormatPipe],
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: PropostaService, useValue: propostaServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PropostaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load propostas on init', () => {
    expect(listarPropostasMock).toHaveBeenCalled();
    expect(component.propostas.length).toBe(1);
    expect(component.isLoading).toBe(false);
  });

  it('should show error message on failure', () => {
    listarPropostasMock.mockReturnValue(
      throwError(() => new Error('Erro de conexão'))
    );
    component.carregarPropostas();
    expect(component.errorMessage).toBe('Erro de conexão');
    expect(component.isLoading).toBe(false);
  });
});

