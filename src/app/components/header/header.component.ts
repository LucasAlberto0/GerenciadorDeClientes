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
  @Input() textoBotao: string = 'Teste';
  @Input() rotaBotao: string = '/cadastro';
  @Input() localizacaoIcone: string = "img/icons/arrow-right-icon.svg"
}
