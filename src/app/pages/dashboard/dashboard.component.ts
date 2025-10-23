import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { TabelaClientesComponent } from "../../components/tabela-clientes/tabela-clientes.component";
import { TituloTabelaComponent } from "../../components/titulo-tabela/titulo-tabela.component";
import { Router } from '@angular/router';
import { BotaoAzulComponent } from "../../components/botao-azul/botao-azul.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, TabelaClientesComponent, TituloTabelaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router = inject(Router);

  NavegarHome(){
    this.router.navigate(['/']);
  }
}
