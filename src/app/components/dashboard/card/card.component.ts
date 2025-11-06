import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { GerenteService } from '../../../services/gerente/gerente.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeletarClienteComponent } from '../modal-deletar-cliente/modal-deletar-cliente.component';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cliente!: any;
  @Output() editar = new EventEmitter<any>();
  @Output() clienteDeletado = new EventEmitter<number>();

  constructor(private _clienteService: ClienteService, private _gerenteService: GerenteService, private _dialog: MatDialog) {}


  excluir(){
    this._clienteService.excluirCliente(this.cliente.id).subscribe({
      next: res => {
        this.clienteDeletado.emit(this.cliente.id);
        this._gerenteService.emitirAtualizacao();
      },
    })
  }

  abrirModalEdicao() {
    this._dialog.open(ModalDeletarClienteComponent, {
      width: '500px',
    })

  }
}
