import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICliente } from '../../interfaces/ICadastroClienteInterface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private _apiUrl: string = enviroment.apiUrl;

  constructor(private _http: HttpClient) {}

  private obterHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  listarClientesDoGestor(): Observable<any> {
    return this._http.get(`${this._apiUrl}/Cliente/ListarClientes`, {headers: this.obterHeaders()})
  }

  criarCliente(cliente: ICliente): Observable<ICliente> {
  const headers = this.obterHeaders();
  return this._http.post<ICliente>(`${this._apiUrl}/Cliente/CriarCliente`, cliente, { headers });
}

  editarCliente(cliente: ICliente): Observable<ICliente> {
    const headers = this.obterHeaders();
    return this._http.put<ICliente>(`${this._apiUrl}/Cliente/EditarCliente`, cliente, {headers})
  }

  excluirCliente(clienteId: number): Observable<any> {
    const headers = this.obterHeaders();
    return this._http.delete(`${this._apiUrl}/Cliente/DeletarCliente?idCliente=${clienteId}`, { headers });
  }
}
