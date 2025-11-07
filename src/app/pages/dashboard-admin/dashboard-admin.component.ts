import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/reutilizavel/header/header.component";
import { InformacoesAdminComponent } from "../../components/dashboard-admin/informacoes-admin/informacoes-admin.component";

@Component({
  selector: 'app-dashboard-admin',
  imports: [HeaderComponent, InformacoesAdminComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {

}
