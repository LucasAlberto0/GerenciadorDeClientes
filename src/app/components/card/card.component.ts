import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ClienteService } from '../../services/cliente.service';
import { GerenteService } from '../../services/gerente.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cliente!: any;
  @Output() editar = new EventEmitter<any>();
  @Output() clienteDeletado = new EventEmitter<number>();

  constructor(private _clienteService: ClienteService, private _gerenteService: GerenteService) {}


  excluir(){
    console.log('ID do cliente:', this.cliente.id);
    this._clienteService.excluirCliente(this.cliente.id).subscribe({
      next: res => {
        console.log('cliente deletado', res);
        this.clienteDeletado.emit(this.cliente.id);
        this._gerenteService.emitirAtualizacao();
      },
      error: err => console.log('Ocorreu um erro ao deletar', err)
    })
  }
}
