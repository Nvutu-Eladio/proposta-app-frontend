import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropostaListComponent } from './pages/proposta-list/proposta-list.component';
import { PropostaFormComponent } from './pages/proposta-form/proposta-form.component';

const routes: Routes = [
  { path: '', component: PropostaListComponent },
  { path: 'cadastrar', component: PropostaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropostasRoutingModule {}
