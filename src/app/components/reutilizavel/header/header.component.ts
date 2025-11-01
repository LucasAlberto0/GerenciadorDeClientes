import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BotaoAzulComponent } from "../botao-azul/botao-azul.component";

@Component({
  selector: 'app-header',
  imports: [BotaoAzulComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _router = inject(Router)

  @Input() textoBotao: string = 'Login';
  @Input() rotaBotao: string = '/login';
  @Input() localizacaoIcone: string = "img/icons/arrow-right-icon.svg"

  sair() {
    localStorage.removeItem('token');
    this._router.navigate([''])
  }
}
