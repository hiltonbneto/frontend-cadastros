import { Component, Input, OnInit } from '@angular/core';
import { HeaderPadraoComponent } from '../../components/header-padrao/header-padrao.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RetornoProduto } from '../../tipos/retorno-produto.type';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RetornoCategoria } from '../../tipos/retorno-categoria.type';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [
    HeaderPadraoComponent,
    ReactiveFormsModule,
    TextInputComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent  {
  @Input() desabilitaBtnPrimary: boolean = true;

  produtoForm!: FormGroup;

  produtos: Array<RetornoProduto> = [];

  categoriasEncontradas: Array<RetornoCategoria> = [];

  categoriaSelecionada!: RetornoCategoria;

  formVisible: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.buscarCategorias()
    this.produtoForm = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl('', [Validators.required]),
      categoria: new FormControl({}, [Validators.required]),
    });
    this.carregarProdutos(false);
  }

  buscarCategorias() {
    this.categoriaService.carregarCategorias().subscribe({
      next: (response) => {
        this.categoriasEncontradas = response;
      },
      error: (responseError) =>
        this.toastService.error(responseError.error.mensagem),
    });
  }

  submit() {
    this.produtoService
      .salvarProduto(
        this.produtoForm.value.id,
        this.produtoForm.value.descricao,
        this.produtoForm.value.categoria
      )
      .subscribe({
        next: (response) => {
          this.toastService.success('Produto cadastrado com sucesso!');
          this.carregarProdutos(false);
          this.formVisible = false;
          this.produtoForm.reset()
        },
        error: (responseError) =>
          this.toastService.error(responseError.error.mensagem),
      });
  }

  salvarProduto() {
    this.produtoService
      .salvarProduto(
        this.produtoForm.value.id,
        this.produtoForm.value.descricao,
        this.produtoForm.value.categoria
      )
      .subscribe({
        next: (response) => {
          this.toastService.success('Produto cadastrado com sucesso!');
          this.carregarProdutos(false);
          this.formVisible = false;
          this.produtoForm.reset()
        },
        error: (responseError) =>
          this.toastService.error(responseError.error.mensagem),
      });
  }

  carregarProdutos(exibirToast: boolean) {
    this.produtoService.carregarProdutos().subscribe({
      next: (response) => {
        this.produtos = response;
        if (exibirToast) {
          this.toastService.success('Produtos carregados!');
        }
      },
      error: (responseError) =>
        this.toastService.error(responseError.error.mensagem),
    });
  }

  editarProduto(produto: RetornoProduto) {
    this.produtoForm = this.formBuilder.group(produto);
    this.formVisible = true;
  }

  validaSelecionado(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }

  removerProduto(id: bigint) {
    this.produtoService.removerProdutos(id).subscribe({
      next: (response) => {
        this.toastService.success('Categoria removida com sucesso!');
        this.carregarProdutos(false);
      },
      error: (responseError) =>
        this.toastService.error(responseError.error?.mensagem),
    });
  }
}
