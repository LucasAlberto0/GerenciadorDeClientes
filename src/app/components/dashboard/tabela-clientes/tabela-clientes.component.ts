import { Component, OnInit } from '@angular/core';
import { BotaoAzulComponent } from "../../reutilizavel/botao-azul/botao-azul.component";
import { CardComponent } from '../card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { CommonModule } from '@angular/common';
import { Skeleton } from "primeng/skeleton";


@Component({
  selector: 'app-tabela-clientes',
  imports: [BotaoAzulComponent, CardComponent, CommonModule, Skeleton],
  templateUrl: './tabela-clientes.component.html',
  styleUrl: './tabela-clientes.component.scss'
})
export class TabelaClientesComponent implements OnInit {
  clientes: any[] = [];
  loading: boolean = true;

  constructor(private _dialog: MatDialog, private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this._clienteService.listarClientesDoGestor().subscribe({
      next: (res) => {
        this.clientes = res.dados;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  abrirModal(cliente?: any) {
    const dialogRef = this._dialog.open(ModalClienteComponent, {
      width: '500px',
      data: cliente ? { cliente } : null
    });

    dialogRef.afterClosed().subscribe((atualizar) => {
      if (atualizar) this.listarClientes();
    })
  }

  removerCliente(id: number){
    this.clientes = this.clientes.filter(c => c.id !== id);
  }
}
