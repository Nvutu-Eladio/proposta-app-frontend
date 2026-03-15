import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { PropostaFormComponent } from './proposta-form.component';
import { PropostaService } from '../../../../core/services/proposta.service';
import { RouterModule } from '@angular/router';
import { PropostaResponse } from '../../../../core/models/proposta.model';

describe('PropostaFormComponent', () => {
  let component: PropostaFormComponent;
  let fixture: ComponentFixture<PropostaFormComponent>;
  let criarPropostaMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    criarPropostaMock = vi.fn(() => of({} as PropostaResponse));
    const propostaServiceStub = { criarProposta: criarPropostaMock };

    await TestBed.configureTestingModule({
      declarations: [PropostaFormComponent],
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [{ provide: PropostaService, useValue: propostaServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PropostaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should have valid form when all required fields are filled', () => {
    component.form.setValue({
      nome: 'João',
      sobreNome: 'Silva',
      cpf: '123.456.789-01',
      telefone: '11999999999',
      renda: 5000,
      valorSolicitado: 10000,
      prazoPagamento: 12,
    });
    expect(component.form.valid).toBe(true);
  });

  it('should call criarProposta on valid submit', () => {
    component.form.setValue({
      nome: 'João',
      sobreNome: 'Silva',
      cpf: '123.456.789-01',
      telefone: '11999999999',
      renda: 5000,
      valorSolicitado: 10000,
      prazoPagamento: 12,
    });
    component.onSubmit();
    expect(criarPropostaMock).toHaveBeenCalled();
  });

  it('should show error message on submit failure', () => {
    criarPropostaMock.mockReturnValue(
      throwError(() => new Error('Erro ao criar'))
    );
    component.form.setValue({
      nome: 'João',
      sobreNome: 'Silva',
      cpf: '123.456.789-01',
      telefone: '11999999999',
      renda: 5000,
      valorSolicitado: 10000,
      prazoPagamento: 12,
    });
    component.onSubmit();
    expect(component.errorMessage).toBe('Erro ao criar');
  });
});

