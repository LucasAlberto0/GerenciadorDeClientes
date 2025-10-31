import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ICadastroGerente } from '../../interfaces/ICadastoGerenteInterface';
import { GerenteService } from '../../services/gerente/gerente.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ErroService } from '../../services/erro/erro.service';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-cadastro',
  imports: [ButtonModule, FormsModule, PasswordModule, FloatLabelModule, FloatLabel, InputTextModule, DividerModule, ReactiveFormsModule, ToastModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  providers: [MessageService, SkeletonModule]
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  value!: string | undefined;
  private _router = inject(Router);
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _gerenteService: GerenteService,
    private _messageService: MessageService,
    private _erroService: ErroService
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

    if(nome?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O nome é obrigatório.');

    if(email?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O email é obrigatório.');

    if(email?.hasError('email')) return this._toast('error', 'Campo obrigatório', 'Digite um endereço de email válido.');

    if(empresa?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O nome da empresa é obrigatório.');

    if(senha?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'A senha é obrigatória.');

    if(senha?.hasError('minlength')) return this._toast('info', 'Senha muito curta', 'A senha deve ter pelo menos 3 caracteres.');

    if(confirmarSenha?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'É necessário confirmar a senha.');

    if(confirmarSenha?.hasError('minlength')) return this._toast('info', 'Senha muito curta', 'A confirmação de senha deve ter pelo menos 3 caracteres.');

    if(senha?.value !== confirmarSenha?.value) return this._toast('error', 'Senhas diferentes', 'As senhas não coincidem. Verifique e tente novamente.');

    if(!formCadastro.valid) return this._toast('warn', 'Formulário inválido', 'Preencha todos os campos obrigatórios corretamente.');

    const novoCadastro = formCadastro.getRawValue() as ICadastroGerente;
    this._gerenteService.cadastrarGerente(novoCadastro).subscribe({
      next: (value) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Cadastro realizado!',
          detail: 'Seu cadastro foi criado com sucesso.',
          life: 3000
        });
        setTimeout(() => {
          this._router.navigateByUrl('login');
        }, 3000);
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: this._erroService.obterMensagem(),
          life: 4000
        });
      }
    });
  }

  private _toast(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this._messageService.add({ severity, summary, detail, life: 3000 });
    this.load(0);
  }

  load(time = 1000000) {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, time);
    }
}