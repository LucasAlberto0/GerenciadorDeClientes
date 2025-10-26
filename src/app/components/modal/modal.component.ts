import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  formCliente!: FormGroup;
  modoEdicao = false;

  constructor(
    private _dialogRef: MatDialogRef<ModalComponent>,
    private _clienteService: ClienteService,
    private _fb: FormBuilder,
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
    });
  }

  salvar() {
    if (this.formCliente.invalid) return;

    const payload = { ...this.formCliente.value };

    if (this.modoEdicao) {
      payload.id = this.data.cliente.id;

      this._clienteService.editarCliente(payload).subscribe({
        next: (res) => {
          console.log('Cliente editado com sucesso!', res);
          this._dialogRef.close(true);
        },
        error: (err) => console.error('Erro ao editar cliente', err)
      });
    } else {
      this._clienteService.criarCliente(payload).subscribe({
        next: (res) => {
          console.log('Cliente criado com sucesso!', res);
          this._dialogRef.close(true);
        },
        error: (err) => console.error('Erro ao criar cliente', err)
      });
    }
  }

  cancelar() {
    this._dialogRef.close();
  }
}
