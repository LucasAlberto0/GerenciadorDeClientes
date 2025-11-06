import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-deletar-cliente',
  imports: [Dialog, ButtonModule, InputTextModule, AvatarModule, CommonModule],
  templateUrl: './modal-deletar-cliente.component.html',
  styleUrl: './modal-deletar-cliente.component.scss',

})
export class ModalDeletarClienteComponent {



  visible: boolean = true;


}
