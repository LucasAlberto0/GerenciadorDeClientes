import { enviroment } from './../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICadastroGerente } from '../interfaces/ICadastoGerenteInterface';


@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  private apiUrl = enviroment.apiUrl;

  constructor(private _http: HttpClient, ) {}

  cadastrar(gerenteCadastro: ICadastroGerente): Observable<ICadastroGerente>{
    return this._http.post<ICadastroGerente>(`${this.apiUrl}/gerente/cadastro`, gerenteCadastro);
  }
}
