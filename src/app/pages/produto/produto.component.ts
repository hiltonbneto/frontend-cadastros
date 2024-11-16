import { Component } from '@angular/core';
import { HeaderPadraoComponent } from "../../components/header-padrao/header-padrao.component";

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [HeaderPadraoComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {

}
