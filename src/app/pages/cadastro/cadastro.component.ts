import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ICadastroGerente } from '../../interfaces/ICadastoGerenteInterface';
import { GerenteService } from '../../services/gerente.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro',
  imports: [ButtonModule, FormsModule, PasswordModule, FloatLabelModule, FloatLabel, InputTextModule, DividerModule, ReactiveFormsModule, ToastModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  providers: [MessageService]
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  value!: string | undefined;
  private _router = inject(Router);

  constructor(
    private _fb: FormBuilder,
    private _gerenteService: GerenteService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this._fb.group({
      nome: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      empresa: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  getCadastro(): FormGroup | null {
    return this.cadastroForm;
  }

  setCadastro(form: FormGroup) {
    this.cadastroForm = form;
  }

  cadastrar() {
    const formCadastro = this.getCadastro();
    if (!formCadastro) return;

    const nome = formCadastro.get('nome');
    const email = formCadastro.get('email');
    const empresa = formCadastro.get('empresa');
    const senha = formCadastro.get('senha');
    const confirmarSenha = formCadastro.get('confirmarSenha');

    if (nome?.hasError('required')) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'O nome é obrigatório.',
        life: 3000
      });
      nome.markAsTouched();
      return;
    }

    if (email?.hasError('required')) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'O email é obrigatório.',
        life: 3000
      });
      email.markAsTouched();
      return;
    }

    if (email?.hasError('email')) {
      this._messageService.add({
        severity: 'error',
        summary: 'Email inválido',
        detail: 'Digite um endereço de email válido.',
        life: 3000
      });
      email.markAsTouched();
      return;
    }

    if (empresa?.hasError('required')) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'O nome da empresa é obrigatório.',
        life: 3000
      });
      empresa.markAsTouched();
      return;
    }

    if (senha?.hasError('required')) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'A senha é obrigatória.',
        life: 3000
      });
      senha.markAsTouched();
      return;
    }

    if (senha?.hasError('minlength')) {
      this._messageService.add({
        severity: 'info',
        summary: 'Senha muito curta',
        detail: 'A senha deve ter pelo menos 3 caracteres.',
        life: 3000
      });
      senha.markAsTouched();
      return;
    }

    if (confirmarSenha?.hasError('required')) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'É necessário confirmar a senha.',
        life: 3000
      });
      confirmarSenha.markAsTouched();
      return;
    }

    if (confirmarSenha?.hasError('minlength')) {
      this._messageService.add({
        severity: 'info',
        summary: 'Senha muito curta',
        detail: 'A confirmação de senha deve ter pelo menos 3 caracteres.',
        life: 3000
      });
      confirmarSenha.markAsTouched();
      return;
    }

    if (senha?.value !== confirmarSenha?.value) {
      this._messageService.add({
        severity: 'error',
        summary: 'Senhas diferentes',
        detail: 'As senhas não coincidem. Verifique e tente novamente.',
        life: 3000
      });
      confirmarSenha?.markAsTouched();
      return;
    }

    if (!formCadastro.valid) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos obrigatórios corretamente.',
        life: 3000
      });
      formCadastro.markAllAsTouched();
      return;
    }

    const novoCadastro = formCadastro.getRawValue() as ICadastroGerente;
    this._gerenteService.cadastrar(novoCadastro).subscribe({
      next: (value) => {
        console.log('Cadastro realizado', value);
        this._messageService.add({
          severity: 'success',
          summary: 'Cadastro realizado!',
          detail: 'Seu cadastro foi criado com sucesso.',
          life: 3000
        });
        setTimeout(() => {
          this._router.navigateByUrl('login');
        }, 4000);
      },
      error: (err) => {
        console.log('Erro ao cadastrar', err);
        this._messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: err?.error?.message || 'Ocorreu um erro inesperado. Tente novamente.',
          life: 4000
        });
      }
    });
  }
}