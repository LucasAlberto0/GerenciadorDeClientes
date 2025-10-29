import { Component, OnInit } from '@angular/core';
import { GerenteService } from '../../services/gerente.service';
import { IDadosGerente } from '../../interfaces/IDadosGerente';
import { Subscription } from 'rxjs';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalGerenteComponent } from '../modal-gerente/modal-gerente.component';

@Component({
  selector: 'app-titulo-tabela',
  imports: [],
  templateUrl: './titulo-tabela.component.html',
  styleUrl: './titulo-tabela.component.scss'
})
export class TituloTabelaComponent implements OnInit {

  nomeDaConta: string = '';
  nomeDaEmpresa: string = '';
  emailGerente: string = '';
  totalDeClientes: number = 0;

  private _sub!: Subscription;

  constructor(private _gerenteService: GerenteService, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarDadosGerente();

    this._sub = this._gerenteService.atualizarDados$.subscribe(() => {
      this.carregarDadosGerente();
    })
  }

  carregarDadosGerente(): void {
  this._gerenteService.obterDadosGerente().subscribe({
    next: (dados: IDadosGerente) => {
      this.nomeDaConta = dados.nome;
      this.nomeDaEmpresa = dados.empresa;
      this.emailGerente = dados.email;
      this.totalDeClientes = dados.totalClientes;
    },
  });
}


abrirModalEdicao() {
  this._dialog.open(ModalGerenteComponent, {
    width: '500px',
    data: {
      gerente: {
        nome: this.nomeDaConta,
        email: this.emailGerente, 
        empresa: this.nomeDaEmpresa
      }
    }
  });
}
}
