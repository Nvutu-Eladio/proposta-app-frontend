import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropostaService } from '../../../../core/services/proposta.service';
import { PropostaRequest } from '../../../../core/models/proposta-request.model';

@Component({
  selector: 'app-proposta-form',
  templateUrl: './proposta-form.component.html',
  styleUrls: ['./proposta-form.component.scss'],
  standalone: false,
})
export class PropostaFormComponent {
  form: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private propostaService: PropostaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      sobreNome: ['', [Validators.required, Validators.minLength(2)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      renda: [null, [Validators.required, Validators.min(0.01)]],
      valorSolicitado: [null, [Validators.required, Validators.min(0.01)]],
      prazoPagamento: [12, [Validators.required, Validators.min(1), Validators.max(24)]],
    });
  }

  get prazoPagamentoValue(): number {
    return this.form.get('prazoPagamento')?.value ?? 12;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.form.value;
    const cpfSemMascara = (formValue.cpf as string).replace(/\D/g, '');

    const proposta: PropostaRequest = {
      nome: formValue.nome,
      sobreNome: formValue.sobreNome,
      cpf: cpfSemMascara,
      telefone: formValue.telefone,
      renda: Number(formValue.renda),
      valorSolicitado: Number(formValue.valorSolicitado),
      prazoPagamento: Number(formValue.prazoPagamento),
      integrada: false,
    };

    this.propostaService.criarProposta(proposta).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Proposta enviada com sucesso! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/propostas']);
        }, 1800);
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (!control?.errors) return '';
    if (control.errors['required']) return 'Campo obrigatório.';
    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres.`;
    }
    if (control.errors['pattern']) return 'Formato inválido.';
    if (control.errors['min']) return 'Valor deve ser maior que zero.';
    if (control.errors['max']) return 'Valor máximo é 24 meses.';
    return 'Valor inválido.';
  }
}
