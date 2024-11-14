import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetornoLogin } from '../tipos/retorno-login.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(usuario: string, senha: string) {
    return this.httpClient.post<RetornoLogin>('/login', { usuario, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("jwt-token", value.token);
        sessionStorage.setItem("nome-usuario", value.nome);
      })
    );
  }
}
