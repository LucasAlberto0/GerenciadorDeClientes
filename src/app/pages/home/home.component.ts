import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/reutilizavel/header/header.component";
import { ApresentacaoComponent } from "../../components/home/apresentacao/apresentacao.component";
import { FeedbackDaGaleraComponent } from "../../components/home/feedback-da-galera/feedback-da-galera.component";
import { QualidadesAlbertechComponent } from "../../components/home/qualidades-albertech/qualidades-albertech.component";
import { FooterComponent } from '../../components/home/footer/footer.component';
import { ConviteParaCadastroComponent } from "../../components/home/convite-para-cadastro/convite-para-cadastro.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ApresentacaoComponent, FeedbackDaGaleraComponent, QualidadesAlbertechComponent, FooterComponent, ConviteParaCadastroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
