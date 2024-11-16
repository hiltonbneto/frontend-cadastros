import { Component, Input } from '@angular/core';
import { HeaderPadraoComponent } from '../../components/header-padrao/header-padrao.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
  ],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  @Input() desabilitaBtnPrimary: boolean = true;

  produtoForm!: FormGroup;

  produtos: Array<RetornoProduto> = [];

  categoriasEncontradas: Array<RetornoCategoria> = [];

  categoriaBusca: string = '';

  formVisible: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.produtoForm = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl('', [Validators.required]),
      categoria: new FormControl(null, [Validators.required]),
    });
    this.carregarProdutos(false);
  }

  selecionarCategoria(categoria: RetornoCategoria) {
    this.produtoForm = this.formBuilder.group({
      id: this.produtoForm.value.id,
      descricao: this.produtoForm.value.descricao,
      categoria: categoria,
    });
    this.categoriasEncontradas = []
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

  editarProduto(categoria: RetornoProduto) {
    this.produtoForm = this.formBuilder.group(categoria);
    this.formVisible = true;
  }

  removerProduto(id: bigint) {
    this.produtoService.removerProdutos(id).subscribe({
      next: (response) => {
        this.toastService.success('Categoria removida com sucesso!');
        this.carregarProdutos(false);
      },
      error: (responseError) =>
        this.toastService.error(responseError.error.mensagem),
    });
  }
}
