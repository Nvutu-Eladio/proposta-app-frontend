import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() title = 'Resultado';
  @Input() showCadastrar = true;
  @Input() showRecolher = false;

  constructor(private router: Router) {}

  navigateToCadastrar(): void {
    this.router.navigate(['/propostas/cadastrar']);
  }

  recolher(): void {
    this.router.navigate(['/propostas']);
  }
}
