import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-padrao',
  standalone: true,
  imports: [],
  templateUrl: './header-padrao.component.html',
  styleUrl: './header-padrao.component.scss',
})
export class HeaderPadraoComponent {
  userName: string = sessionStorage.getItem('nome-usuario') || '';

  constructor(private router: Router) {}

  sair() {
    sessionStorage.clear();
    this.router.navigate([''])
  }
}
