import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modal-deletar-cliente',
  imports: [Dialog],
  templateUrl: './modal-deletar-cliente.component.html',
  styleUrl: './modal-deletar-cliente.component.scss',

})
export class ModalDeletarClienteComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirmar = new EventEmitter<void>();

  fechar() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  confirmarDelecao() {
    this.confirmar.emit();
    this.fechar();
  }
}
