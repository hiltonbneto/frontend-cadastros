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
  selector: 'app-login',
  standalone: true,
  providers: [LoginService],
  imports: [LoginPadraoComponent, ReactiveFormsModule, TextInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.loginService
      .login(this.loginForm.value.login, this.loginForm.value.senha)
      .subscribe({
        next: () => {
          this.toastService.success('Login realizado com sucesso!');
          this.toCategoria();
        },
        error: (responseError) => this.toastService.error(responseError.error.mensagem),
      });
  }

  toCategoria() {
    this.router.navigate(['/categoria']);
  }

  navigate() {
    this.router.navigate(['/cadastrar-usuario']);
  }
}
