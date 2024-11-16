import { Component, Input } from '@angular/core';
import { HeaderPadraoComponent } from '../../components/header-padrao/header-padrao.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { RetornoCategoria } from '../../tipos/retorno-categoria.type';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    HeaderPadraoComponent,
    ReactiveFormsModule,
    TextInputComponent,
    CommonModule,
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent {
  @Input() desabilitaBtnPrimary: boolean = true;

  categoriaForm!: FormGroup;

  categorias: Array<RetornoCategoria> = [];

  formVisible: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.categoriaForm = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl('', [Validators.required]),
    });
    this.carregarCategorias(false);
  }

  submit() {
    this.categoriaService
      .salvarCategoria(
        this.categoriaForm.value.id,
        this.categoriaForm.value.descricao
      )
      .subscribe({
        next: (response) => {
          this.toastService.success('Categoria cadastrada com sucesso!');
          this.carregarCategorias(false);
          this.formVisible = false;
        },
        error: (responseError) =>
          this.toastService.error(responseError.error.mensagem),
      });
  }

  carregarCategorias(exibirToast: boolean) {
    this.categoriaService.carregarCategorias().subscribe({
      next: (response) => {
        this.categorias = response;
        if (exibirToast) {
          this.toastService.success('Categorias carregadas!');
        }
      },
      error: (responseError) =>
        this.toastService.error(responseError.error.mensagem),
    });
  }

  editarCategoria(categoria: RetornoCategoria) {
    this.categoriaForm = this.formBuilder.group(categoria);
    this.formVisible = true;
  }

  removerCategoria(id: bigint) {
    this.categoriaService.removerCategorias(id).subscribe({
      next: (response) => {
        this.toastService.success('Categoria removida com sucesso!');
        this.carregarCategorias(false);
      },
      error: (responseError) =>
        this.toastService.error(responseError.error.mensagem),
    });
  }
}
