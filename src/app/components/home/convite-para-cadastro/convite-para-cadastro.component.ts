import { Component, Input } from '@angular/core';
import { BotaoAzulComponent } from "../../reutilizavel/botao-azul/botao-azul.component";

@Component({
  selector: 'app-convite-para-cadastro',
  imports: [BotaoAzulComponent],
  templateUrl: './convite-para-cadastro.component.html',
  styleUrl: './convite-para-cadastro.component.scss'
})
export class ConviteParaCadastroComponent {
  @Input() textoBotao: string = 'Criar Conta Grátis';
  @Input() rotaBotao: string = '/cadastro';
  @Input() localizacaoIcone: string = "img/icons/arrow-right-icon.svg"
}
