import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-header',
  imports: [],
  templateUrl: './botao-header.component.html',
  styleUrl: './botao-header.component.scss'
})
export class BotaoHeaderComponent {
  @Input() texto: string = '';
  @Input() rota: string = '/'
  @Input() icone: string = ''

  router = inject(Router);

  navegar() {
    this.router.navigate([this.rota]);
  }
}
