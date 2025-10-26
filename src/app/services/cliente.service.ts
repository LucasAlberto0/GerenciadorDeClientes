import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private _apiUrl: string = enviroment.apiUrl;

  constructor(private _http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  listarClientesDoGestor(): Observable<any> {
    return this._http.get(`${this._apiUrl}/Cliente/ListarClientes`, {headers: this.getHeaders()})
  }

  criarCliente(cliente: any): Observable<any> {
  const headers = this.getHeaders();
  return this._http.post(`${this._apiUrl}/Cliente/CriarCliente`, cliente, { headers });
}

  editarCliente(cliente: any): Observable<any> {
    const headers = this.getHeaders();
    return this._http.put(`${this._apiUrl}/Cliente/EditarCliente`, cliente, {headers})
  }

  excluirCliente(clienteId: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.delete(`${this._apiUrl}/Cliente/DeletarCliente?idCliente=${clienteId}`, { headers });;
  }
}
