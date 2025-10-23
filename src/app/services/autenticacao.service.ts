import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private _apiUrl: string = enviroment.apiUrl; 

  constructor(private _http: HttpClient) {}

  autenticar(email: string, password: string): Observable<any>{
    return this._http.post(`${this._apiUrl}/gerente/login`, {email, password})
  }
}
