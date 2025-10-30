import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErroService {
  mensagem: string = '';

  definirMensagem(mensagem: string) {
    this.mensagem = mensagem;
  }

  obterMensagem() {
    return this.mensagem;
  }
}
