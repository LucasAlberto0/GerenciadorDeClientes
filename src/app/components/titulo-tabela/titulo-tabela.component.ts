import { Component, OnInit } from '@angular/core';
import { GerenteService } from '../../services/gerente.service';
import { IDadosGerente } from '../../interfaces/IDadosGerente';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-titulo-tabela',
  imports: [],
  templateUrl: './titulo-tabela.component.html',
  styleUrl: './titulo-tabela.component.scss'
})
export class TituloTabelaComponent implements OnInit {

  nomeDaConta: string = '';
  nomeDaEmpresa: string = '';
  totalDeClientes: number = 0;

  private _sub!: Subscription;

  constructor(private _gerenteService: GerenteService) {}

  ngOnInit(): void {
    this.carregarDadosGerente();

    this._sub = this._gerenteService.atualizarDados$.subscribe(() => {
      this.carregarDadosGerente();
    })
  }

  carregarDadosGerente(): void {
  this._gerenteService.obterDados().subscribe({
    next: (dados: IDadosGerente) => {
      this.nomeDaConta = dados.nome;
      this.nomeDaEmpresa = dados.empresa;
      this.totalDeClientes = dados.totalClientes;
    },
    error: (erro) => {
      console.error('Erro ao carregar os dados do gerente', erro);
    }
  });
}

}
