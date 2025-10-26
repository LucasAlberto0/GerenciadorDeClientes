import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Password, PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { MessageModule } from 'primeng/message';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ButtonModule, FormsModule, PasswordModule, FloatLabelModule, FloatLabel, InputTextModule, ReactiveFormsModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private _router = inject(Router);
  clickLogar: boolean = false;
  constructor(private _fb: FormBuilder, private _authService: AutenticacaoService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.email, Validators.required]],
      senha: [null, Validators.required]
    })
  }

  login() {
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    this._authService.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('Login realizado com sucesso!', value);

        localStorage.setItem('token', value.token)

        this._router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log('Erro no login', err);
      }
    })
    this.clickLogar = false;
  }

  isInvalid(controlName: string) {
        const control = this.loginForm.get('email');
        return control?.invalid && (control.touched || this.clickLogar );
    }
}
