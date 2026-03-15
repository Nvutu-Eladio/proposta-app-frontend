import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'propostas', pathMatch: 'full' },
  {
    path: 'propostas',
    loadChildren: () =>
      import('./features/propostas/propostas.module').then(
        (m) => m.PropostasModule
      ),
  },
  { path: '**', redirectTo: 'propostas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
