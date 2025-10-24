import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  ramoEmpresa: string = "Tecnologia";

  constructor(private _dialog: MatDialog) {}

  editarProduto(){
    const dialogRef = this._dialog.open(ModalComponent, {
      width: '500px'
    })
  }
}
