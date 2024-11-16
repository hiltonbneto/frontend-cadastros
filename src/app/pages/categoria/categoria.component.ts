import { Component } from '@angular/core';
import { HeaderPadraoComponent } from "../../components/header-padrao/header-padrao.component";

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [HeaderPadraoComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

}