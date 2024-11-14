import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { LoginPadraoComponent } from '../../components/login-padrao/login-padrao.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginService],
  imports: [LoginPadraoComponent, ReactiveFormsModule, TextInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new FormGroup({
       usuario: new FormControl('', [Validators.required]),
       senha: new FormControl('', [Validators.required])
    })
  }

  submit() {
    console.log(this.loginForm)
    this.loginService.login(this.loginForm.value.usuario, this.loginForm.value.senha).subscribe({
      next: () => console.log('deu certo'),
      error: () =>  console.log('deu ruim')
    })
  }

  navigate() {
    this.router.navigate(["/cadastrar"]);
  }

}
