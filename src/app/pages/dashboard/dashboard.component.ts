import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/reutilizavel/header/header.component";
import { TabelaClientesComponent } from "../../components/dashboard/tabela-clientes/tabela-clientes.component";
import { TituloTabelaComponent } from "../../components/dashboard/titulo-tabela/titulo-tabela.component";
import { Router } from '@angular/router';
import { BotaoAzulComponent } from "../../components/reutilizavel/botao-azul/botao-azul.component";
import { GraficoStatusComponent } from "../../components/dashboard/grafico-status/grafico-status.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, TabelaClientesComponent, TituloTabelaComponent, GraficoStatusComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router = inject(Router);

  NavegarHome(){
    this.router.navigate(['/']);
  }
}
