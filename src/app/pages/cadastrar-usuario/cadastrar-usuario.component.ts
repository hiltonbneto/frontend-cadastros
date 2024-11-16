import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { LoginPadraoComponent } from '../../components/login-padrao/login-padrao.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  providers: [LoginService],
  imports: [LoginPadraoComponent, ReactiveFormsModule, TextInputComponent],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss',
})
export class CadastrarUsuarioComponent {
  cadastrarUsuarioForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.cadastrarUsuarioForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.loginService
      .cadastrarUsuario(
        this.cadastrarUsuarioForm.value.nome,
        this.cadastrarUsuarioForm.value.login,
        this.cadastrarUsuarioForm.value.senha
      )
      .subscribe({
        next: () => {
          this.toastService.success('Usuário cadastrado com sucesso!');
          this.navigate()
        },
        error: (responseError) => {
          this.toastService.error(responseError.error.mensagem);
        },
      });
  }

  navigate() {
    this.router.navigate(['']);
  }
}
