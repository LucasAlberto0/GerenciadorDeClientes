import { enviroment } from './../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ICadastroGerente } from '../interfaces/ICadastoGerenteInterface';
import { IDadosGerente } from '../interfaces/IDadosGerente';


@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  private _apiUrl = enviroment.apiUrl;

  private _autalizarDados$ = new Subject<void>();

  constructor(private _http: HttpClient,) { }

  private obterHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  cadastrar(gerenteCadastro: ICadastroGerente): Observable<ICadastroGerente> {
    return this._http.post<ICadastroGerente>(`${this._apiUrl}/gerente/cadastro`, gerenteCadastro);
  }

  obterDados(): Observable<IDadosGerente> {
    return this._http.get<{ dados: IDadosGerente }>(`${this._apiUrl}/gerente/dados`, { headers: this.obterHeaders() })
      .pipe(
        map(resposta => resposta.dados)
      );
  }

  get atualizarDados$(): Observable<void> {
    return this._autalizarDados$.asObservable();
  }

  emitirAtualizacao(): void {
    this._autalizarDados$.next();
  }
}
