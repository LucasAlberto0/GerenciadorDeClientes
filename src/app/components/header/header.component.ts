import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BotaoHeaderComponent } from "../botao-header/botao-header.component";

@Component({
  selector: 'app-header',
  imports: [BotaoHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() textoBotao: string = 'Teste';
  @Input() rotaBotao: string = '/cadastro';
  @Input() localizacaoIcone: string = "img/icons/arrow-right-icon.svg"
}
