import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetornoLogin } from '../tipos/retorno-login.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrlApi: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  login(login: string, senha: string) {
    return this.httpClient.post<RetornoLogin>(`${this.baseUrlApi}/login`, { login, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("jwt-token", value.token);
        sessionStorage.setItem("nome-usuario", value.nome);
      })
    );
  }

  cadastrarUsuario(nome: string, login: string, senha: string) {
    return this.httpClient.post<RetornoLogin>(`${this.baseUrlApi}/cadastrar-usuario`, { nome, login, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("jwt-token", value.token);
        sessionStorage.setItem("nome-usuario", value.nome);
      })
    );
  }
}
