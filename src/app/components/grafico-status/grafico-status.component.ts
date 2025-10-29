import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GerenteService } from '../../services/gerente.service';
import { IDadosGerente } from '../../interfaces/IDadosGerente';
import { Subscription } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-status',
  imports: [],
  templateUrl: './grafico-status.component.html',
  styleUrl: './grafico-status.component.scss'
})
export class GraficoStatusComponent implements OnInit {

  private _chart!: Chart;
  private _subscription!: Subscription;

  constructor(private gerenteService: GerenteService) { }

  ngOnInit(): void {
    this.iniciarGrafico();
    this.carregarDados();
    this._subscription = this.gerenteService.atualizarDados$.subscribe(() => this.carregarDados());
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  private iniciarGrafico(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this._chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ativo', 'Inativo', 'Em Negociação'],
        datasets: [{
          label: 'Clientes',
          data: [0, 0, 0],
          backgroundColor: ['#2BBDEE', '#0e495dff', '#a6ddefff'],
          borderColor: ['#2BBDEE', '#0e495dff', '#a6ddefff'],
          borderWidth: 1
        }]
      },
      options: {}
    });
  }

  private carregarDados(): void {
    this.gerenteService.obterDadosGerente().subscribe({
      next: (dados: IDadosGerente) => {
        if (!this._chart) return;

        this._chart.data.datasets[0].data = [
          dados.clientesAtivos,
          dados.clientesInativos,
          dados.clientesEmNegociacao
        ];
        this._chart.update();
      }
    });
  }
}
