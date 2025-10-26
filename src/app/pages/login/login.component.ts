import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  imports: [ButtonModule, FormsModule, PasswordModule, FloatLabelModule, FloatLabel, InputTextModule, ReactiveFormsModule, MessageModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private _router = inject(Router);
  clickLogar: boolean = false;
  constructor(private _fb: FormBuilder, private _authService: AutenticacaoService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.email, Validators.required]],
      senha: [null, Validators.required]
    })
  }

  login() {
    const form = this.loginForm;
    if (!form) return;

    const emailControl = form.get('email');
    const senhaControl = form.get('senha');

    if (emailControl?.hasError('required')) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'O email é obrigatório.',
        life: 3000
      });
      emailControl.markAsTouched();
      return;
    }

    if (emailControl?.hasError('email')) {
      this._messageService.add({
        severity: 'error',
        summary: 'Email inválido',
        detail: 'Digite um endereço de email valido.',
        life: 3000
      });
      emailControl.markAsTouched();
      return;
    }

    if (senhaControl?.hasError('required')) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'A senha é obrigatoria.',
        life: 3000
      });
      senhaControl.markAsTouched();
      return;
    }

    if (!form.valid) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos corretamente.',
        life: 3000
      });
      form.markAllAsTouched();
      return;
    }

    const { email, senha } = form.getRawValue();

    this._authService.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('Login realizado com sucesso!', value);
        localStorage.setItem('token', value.token);

        this._messageService.add({
          severity: 'success',
          summary: 'Login realizado!',
          detail: 'Bem-vindo de volta!',
          life: 2500
        });

        setTimeout(() => {
          this._router.navigateByUrl('/dashboard');
        }, 1000);
      },
      error: (err) => {
        console.log('Erro no login', err);

        this._messageService.add({
          severity: 'error',
          summary: 'Erro ao fazer login',
          detail: err?.error?.message || 'Credenciais inválidas. Tente novamente.',
          life: 3000
        });
      }
    });
    this.clickLogar = false;
  }
}
