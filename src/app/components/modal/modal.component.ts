import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { GerenteService } from '../../services/gerente.service';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, Toast, InputMaskModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [MessageService]
})
export class ModalComponent implements OnInit {
  formCliente!: FormGroup;
  modoEdicao = false;
  loading: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<ModalComponent>,
    private _clienteService: ClienteService,
    private _fb: FormBuilder,
    private _gerenteService: GerenteService,
    private _messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.modoEdicao = !!this.data?.cliente;

    this.formCliente = this._fb.group({
      nome: [this.data?.cliente?.nome || '', Validators.required],
      nomeDaEmpresa: [this.data?.cliente?.nomeDaEmpresa || '', Validators.required],
      email: [this.data?.cliente?.email || '', [Validators.required, Validators.email]],
      ramoDaEmpresa: [this.data?.cliente?.ramoDaEmpresa || '', Validators.required],
      telefone: [this.data?.cliente?.telefone || '', Validators.required],
      cidade: [this.data?.cliente?.cidade || '', Validators.required],
      status: [this.data?.cliente?.status || '', Validators.required],
      
    });
  }

  salvar() {
    const form = this.formCliente;
    if (!form) return;

    const nome = form.get('nome');
    const empresa = form.get('nomeDaEmpresa');
    const email = form.get('email');
    const ramo = form.get('ramoDaEmpresa');
    const telefone = form.get('telefone');
    const cidade = form.get('cidade');
    const status = form.get('status');

    if (nome?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O nome é obrigatório.');

    if (empresa?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O nome da empresa é obrigatorio.');

    if (email?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O email é obrigatório.');

    if (email?.hasError('email')) return this._toast('error', 'Email inválido', 'Digite um email válido.');

    if (ramo?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O ramo da empresa é obrigatório.');

    if (telefone?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O telefone é obrigatório.');
    
    if (cidade?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'A cidade é obrigatória.');

    if (status?.hasError('required')) return this._toast('warn', 'Campo obrigatório', 'O status é obrigatório.');

    if (!form.valid) {
      return this._toast('warn', 'Formulário inválido', 'Preencha todos os campos corretamente.');
    }

    const payload = { ...form.getRawValue() };
    if (this.modoEdicao) payload.id = this.data.cliente.id;

    this.loading = true;

    const requisicao = this.modoEdicao
      ? this._clienteService.editarCliente(payload)
      : this._clienteService.criarCliente(payload);

    requisicao.subscribe({
      next: (res) => {
        this._toast(
          'success',
          this.modoEdicao ? 'Cliente atualizado!' : 'Cliente criado!',
          this.modoEdicao ? 'As informações do cliente foram atualizadas com sucesso.' : 'Novo cliente cadastrado com sucesso.'
        );

        setTimeout(() => {
          this.loading = false;
          this._dialogRef.close(true);
          if (!this.modoEdicao) this._gerenteService.emitirAtualizacao();
        }, 1000);
      },
      error: (err) => {
        this._toast('error', 'Erro', err?.error?.message || 'Ocorreu um erro inesperado. Tente novamente.');
        this.loading = false;
      }
    });
  }

  cancelar() {
    this._dialogRef.close();
  }

  private _toast(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this._messageService.add({ severity, summary, detail, life: 3000 });
  }
}
