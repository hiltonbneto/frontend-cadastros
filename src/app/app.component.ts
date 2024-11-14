import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPadraoComponent } from "./components/login-padrao/login-padrao.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-cadastros';
}
