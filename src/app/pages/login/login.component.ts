import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Password, PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AutenticacaoService } from '../../services/autenticacao.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ButtonModule, FormsModule, PasswordModule, FloatLabelModule, FloatLabel, InputTextModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private _router = inject(Router);

  constructor(private _fb: FormBuilder, private _authService: AutenticacaoService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null],
      password: [null]
    })
  }

  login() {
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.password;

    this._authService.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('Login realizado com sucesso!', value);
        this._router.navigateByUrl('/');
      },
      error: (err) => {
        console.log('Erro no login', err);
      }
    })
  }
}
