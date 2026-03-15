import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CpfFormatPipe } from './pipes/cpf-format.pipe';
import { CurrencyBrPipe } from './pipes/currency-br.pipe';
import { CpfMaskDirective } from './directives/cpf-mask.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingSpinnerComponent,
    CpfFormatPipe,
    CurrencyBrPipe,
    CpfMaskDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    LoadingSpinnerComponent,
    CpfFormatPipe,
    CurrencyBrPipe,
    CpfMaskDirective,
  ],
})
export class SharedModule {}
