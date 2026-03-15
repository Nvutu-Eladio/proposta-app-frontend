import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PropostasRoutingModule } from './propostas-routing.module';
import { PropostaListComponent } from './pages/proposta-list/proposta-list.component';
import { PropostaFormComponent } from './pages/proposta-form/proposta-form.component';
import { PropostaTableComponent } from './components/proposta-table/proposta-table.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PropostaListComponent,
    PropostaFormComponent,
    PropostaTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropostasRoutingModule,
    SharedModule,
  ],
})
export class PropostasModule {}
