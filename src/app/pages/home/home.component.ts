import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ApresentacaoComponent } from "../../components/apresentacao/apresentacao.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ApresentacaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
