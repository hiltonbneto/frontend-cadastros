import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { ValidaRotasService } from './services/valida-rotas.service';

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "cadastrar-usuario",
    component: CadastrarUsuarioComponent
  },
  {
    path: "categoria",
    component: CategoriaComponent,
    canActivate: [ValidaRotasService]
  },
  {
    path: "produto",
    component: ProdutoComponent,
    canActivate: [ValidaRotasService]
  }
];
