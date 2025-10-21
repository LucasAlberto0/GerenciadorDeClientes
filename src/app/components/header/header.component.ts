import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);

  NavegarCadastro() {
    this.router.navigate(['cadastro']);
  }

  NavegarLogin() {
    this.router.navigate(['login']);
  }
}
