import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apresentacao',
  imports: [],
  templateUrl: './apresentacao.component.html',
  styleUrl: './apresentacao.component.scss'
})
export class ApresentacaoComponent {
  router = inject(Router);

  NavegarRota() {
    this.router.navigate(['cadastro']);
  }
}
