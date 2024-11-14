import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-padrao',
  standalone: true,
  imports: [],
  templateUrl: './login-padrao.component.html',
  styleUrl: './login-padrao.component.scss'
})
export class LoginPadraoComponent {
  @Input() title: String = "";
  @Input() textoBtnPrimary: String = "";
  @Input() textoBtnSecondary: String = "";

  @Output("submit") onSubmit = new EventEmitter();

  @Output("navigate") onNavigate = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit()
  }
}
