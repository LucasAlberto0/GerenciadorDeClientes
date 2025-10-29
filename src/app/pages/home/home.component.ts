import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/reutilizavel/header/header.component";
import { ApresentacaoComponent } from "../../components/home/apresentacao/apresentacao.component";
import { FeedbackDaGaleraComponent } from "../../components/home/feedback-da-galera/feedback-da-galera.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ApresentacaoComponent, FeedbackDaGaleraComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
