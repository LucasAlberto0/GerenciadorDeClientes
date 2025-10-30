import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ErroService } from '../../services/erro/erro.service';


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
  constructor(private _fb: FormBuilder, private _authService: AutenticacaoService, private _messageService: MessageService, private _erroService: ErroService) { }

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

    if(emailControl?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O email é obrigatório.');

    if(emailControl?.hasError('email')) return this._toast('error', 'Email inválido', 'Digite um endereço de email válido');
    
    if(senhaControl?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'A senha é obrigatória.');

    if(!form.valid)  return this._toast('warn', 'Formulário inválido', 'Preencha todos os campos corretamente.');

    const { email, senha } = form.getRawValue();

    this._authService.autenticar(email, senha).subscribe({
      next: (value) => {
        localStorage.setItem('token', value.token);

        this._messageService.add({
          severity: 'success',
          summary: 'Login realizado!',
          detail: 'Bem-vindo!',
          life: 2500
        });

        setTimeout(() => {
          this._router.navigateByUrl('/dashboard');
        }, 1000);
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro ao fazer login',
          detail: this._erroService.obterMensagem() || 'Credenciais inválidas. Tente novamente.',
          life: 3000
        });
      }
    });
    this.clickLogar = false;
  }

  private _toast(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this._messageService.add({ severity, summary, detail, life: 3000 });
  }
}
