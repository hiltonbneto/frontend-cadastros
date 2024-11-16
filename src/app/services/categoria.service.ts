import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetornoCategoria } from '../tipos/retorno-categoria.type';
import { RetornoRemoverCategoria } from '../tipos/retorno-remover-categoria.type';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrlApi: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  salvarCategoria(id: string, descricao: string) {
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<RetornoCategoria>(`${this.baseUrlApi}/categoria`, { id, descricao }, { headers: httpHeaders });
  }

  carregarCategorias() {
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<RetornoCategoria[]>(`${this.baseUrlApi}/categoria`, { headers: httpHeaders });
  }

  removerCategorias(id: bigint) {
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.delete<RetornoRemoverCategoria>(`${this.baseUrlApi}/categoria/${id}`, { headers: httpHeaders });
  }
}
