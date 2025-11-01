import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GerenteService } from '../../../services/gerente/gerente.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-cidades',
  imports: [],
  templateUrl: './grafico-cidades.component.html',
  styleUrl: './grafico-cidades.component.scss'
})
export class GraficoCidadesComponent implements OnInit, OnDestroy {
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
    const ctx = document.getElementById('graficoCidades') as HTMLCanvasElement;
    this._chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Clientes por Cidade',
          data: [],
          backgroundColor: ['#2BBDEE', '#0e495dff', '#a6ddefff', '#18262bff', '#d8e8eeff', '#00749eff'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
        }
      }
    });
  }

  private carregarDados(): void {
    this.gerenteService.obterDadosGerente().subscribe({
      next: (dados: any) => {
        if (!this._chart) return;
        const labels = dados.clientesPorCidade.map((c: any) => c.cidade);
        const valores = dados.clientesPorCidade.map((c: any) => c.quantidade);
        this._chart.data.labels = labels;
        this._chart.data.datasets[0].data = valores;
        this._chart.update();
      }
    });
  }
}
