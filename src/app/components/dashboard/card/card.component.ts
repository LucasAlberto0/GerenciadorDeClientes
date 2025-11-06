import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { GerenteService } from '../../../services/gerente/gerente.service';
import { CommonModule } from '@angular/common';
import { ModalDeletarClienteComponent } from '../modal-deletar-cliente/modal-deletar-cliente.component';

@Component({
  selector: 'app-card',
  imports: [CommonModule, ModalDeletarClienteComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cliente!: any;
  @Output() editar = new EventEmitter<any>();
  @Output() clienteDeletado = new EventEmitter<number>();
  @Output() pedirDelecao = new EventEmitter<any>();

  modalDeletarVisivel = false;

  constructor(
    private _clienteService: ClienteService,
    private _gerenteService: GerenteService
  ) {}

  abrirModalDeletar() {
    this.modalDeletarVisivel = true;
  }

  confirmarDelecao() {
    this._clienteService.excluirCliente(this.cliente.id).subscribe({
      next: () => {
        this.clienteDeletado.emit(this.cliente.id);
        this._gerenteService.emitirAtualizacao();
        this.modalDeletarVisivel = false;
      }
    });
  }
}
