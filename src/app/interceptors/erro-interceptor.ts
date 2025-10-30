import { ErroService } from '../services/erro/erro.service';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {

  const erroService = inject(ErroService);

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      const mensagemErro = obterMensagemDeErroViaStatus(erro.status)
      erroService.definirMensagem(mensagemErro)
      return throwError(() => erro)
    })
  )
};

function obterMensagemDeErroViaStatus(status: number): string {
  const mensagensDeErro: Record<number, string> = {
    0: 'Não foi posível se conectar ao servicor.',
    401: 'Credenciais inválidas. Tente novamente.',
    404: 'O recurso não foi encontrado.',
    500: 'Erro no servidor. Tente novamente mais tarde.'
  }
  return mensagensDeErro[status] || 'Ocorreu um erro inesperado.'
}
