import { Component, Input } from '@angular/core';
import { HeaderPadraoComponent } from '../../components/header-padrao/header-padrao.component';
import {
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

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.categoriaForm = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl('', [Validators.required]),
    });
    this.carregarCategorias();
  }

  submit() {
    console.log('teste', this.categoriaForm.value.descricao);
    this.categoriaService
      .salvarCategoria(
        this.categoriaForm.value.id,
        this.categoriaForm.value.descricao
      )
      .subscribe({
        next: (response) => {
          this.toastService.success('Categoria cadastrada com sucesso!');
          this.carregarCategorias();
        },
        error: (responseError) =>
          this.toastService.error(responseError.error.mensagem),
      });
  }

  carregarCategorias() {
    this.categoriaService.carregarCategorias().subscribe({
      next: (response) => {
        this.categorias = response;
        this.toastService.success('Categorias carregadas!');
      },
      error: (responseError) =>
        this.toastService.error(responseError.error.mensagem),
    });
  }

  removerCategoria(id: bigint) {
    this.categoriaService.removerCategorias(id).subscribe({
      next: (response) => {
        console.log(response);
        // this.toastService.success('Categorias carregadas!');
      },
      error: (responseError) =>
        this.toastService.error(responseError.error.mensagem),
    });
  }
}
