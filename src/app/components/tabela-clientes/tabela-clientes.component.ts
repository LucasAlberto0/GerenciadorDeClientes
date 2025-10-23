import { Component } from '@angular/core';
import { BotaoAzulComponent } from "../botao-azul/botao-azul.component";
import { CardComponent } from "../card/card.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-tabela-clientes',
  imports: [BotaoAzulComponent, CardComponent],
  templateUrl: './tabela-clientes.component.html',
  styleUrl: './tabela-clientes.component.scss'
})
export class TabelaClientesComponent {

  constructor(private _dialog: MatDialog) {}

  abrirModal() {
    const dialogRef = this._dialog.open(ModalComponent, {
      width: '500px'
    });
  }
}
