import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GerenteService } from '../../services/gerente.service';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-modal-gerente',
  imports: [Toast, CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule,PasswordModule, FloatLabelModule, FloatLabel, InputTextModule, DividerModule,],
  templateUrl: './modal-gerente.component.html',
  styleUrl: './modal-gerente.component.scss',
  providers: [MessageService]
})
export class ModalGerenteComponent implements OnInit {
  formGerente!: FormGroup;
  loading = false;

  constructor(
    private _dialogRef: MatDialogRef<ModalGerenteComponent>,
    private _gerenteService: GerenteService,
    private _fb: FormBuilder,
    private _messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    const gerente = this.data?.gerente || {};

    this.formGerente = this._fb.group({
      nome: [gerente.nome || '', Validators.required],
      email: [gerente.email || '', [Validators.required, Validators.email]],
      empresa: [gerente.empresa || '', Validators.required],
      senhaAtual: [''],
      novaSenha: ['']
    });
  }

  salvar() {
    const form = this.formGerente;
    if (!form.valid) {
      return this._toast('warn', 'Formulário inválido', 'Preencha todos os campos corretamente.');
    }

    const email = form.get('email');
    if (email?.hasError('email'))
      return this._toast('error', 'Email inválido', 'Digite um email válido.');

    const payload = form.getRawValue();

    if ((payload.senhaAtual && !payload.novaSenha) || (!payload.senhaAtual && payload.novaSenha)) {
      return this._toast('warn', 'Campos obrigatórios', 'Preencha a senha atual e a nova senha para alterar.');
    }

    this.loading = true;

    this._gerenteService.editarGerente(payload).subscribe({
      next: (res) => {
        this._toast('success', 'Gerente atualizado!', 'As informações foram atualizadas com sucesso.');

        this._gerenteService.emitirAtualizacao();

        setTimeout(() => {
          this.loading = false;
          this._dialogRef.close(true);
        }, 1000);
      },
      error: (err) => {
        this._toast('error', 'Erro', err?.error?.mensagem || 'Ocorreu um erro inesperado.');
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