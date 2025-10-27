import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-status',
  imports: [],
  templateUrl: './grafico-status.component.html',
  styleUrl: './grafico-status.component.scss'
})
export class GraficoStatusComponent implements AfterViewInit{
  ngAfterViewInit(): void {
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Ativo', 'Inativo', 'Em Negociação',],
            datasets: [{
              label: 'Clientes',
              data: [12, 19, 3,],
              backgroundColor: [
                '#E8F9EF',
                '#FDF7E6',
                '#FDECEC',
              ],
              borderColor: [
                '#2AA359',
                '#CD8A04',
                '#DC2626',
              ],
              borderWidth: 1
            }]
          },
          options: {
          }
        });
      }
}
