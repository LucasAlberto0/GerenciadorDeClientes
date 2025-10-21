import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { TabelaClientesComponent } from "../../components/tabela-clientes/tabela-clientes.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, TabelaClientesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
