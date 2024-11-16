import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetornoProduto } from '../tipos/retorno-produto.type';
import { RetornoRemover } from '../tipos/retorno-remover.type';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrlApi: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  salvarProduto(id: string, descricao: string, categoria: RetornoProduto) {
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<RetornoProduto>(`${this.baseUrlApi}/produto`, { id, descricao, categoria }, { headers: httpHeaders });
  }

  carregarProdutos() {
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<RetornoProduto[]>(`${this.baseUrlApi}/produto`, { headers: httpHeaders });
  }

  removerProdutos(id: bigint) {
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.delete<RetornoRemover>(`${this.baseUrlApi}/produto/${id}`, { headers: httpHeaders });
  }
}
