import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-azul',
  imports: [],
  templateUrl: './botao-azul.component.html',
  styleUrl: './botao-azul.component.scss'
})
export class BotaoAzulComponent {
  @Input() texto: string = '';
  @Input() rota?: string;
  @Input() icone: string = ''
  @Output() clicado = new EventEmitter<void>();

  router = inject(Router);

  onClick() {
    if(this.rota){
      this.router.navigate([this.rota]);
    }else {
      this.clicado.emit();
    }
  }
}
