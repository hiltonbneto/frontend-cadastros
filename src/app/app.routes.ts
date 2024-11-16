import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cadastrar-usuario",
    component: CadastrarUsuarioComponent
  },
  {
    path: "categoria",
    component: CategoriaComponent
  }
];
