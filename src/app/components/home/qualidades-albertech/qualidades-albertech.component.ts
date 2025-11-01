import { Component } from '@angular/core';

@Component({
  selector: 'app-qualidades-albertech',
  imports: [],
  templateUrl: './qualidades-albertech.component.html',
  styleUrl: './qualidades-albertech.component.scss'
})
export class QualidadesAlbertechComponent {

  qualidades = [{
    imagem: 'img/icons/dados-icon.svg',
    titulo: 'Dados Seguros',
    descricao: 'Armazenamento seguro com backup automático e proteção total'
  },
  {
    imagem: 'img/icons/comunidade-icon.svg',
    titulo: 'Gestão Completa',
    descricao: 'Cadastre, edite e organize todos os seus clientes em uma interface moderna'
  },
  {
    imagem: 'img/icons/grafico-icon.svg',
    titulo: 'Relatórios Inteligentes',
    descricao: 'Visualize métricas e estatísticas em tempo real com gráficos interativos'
  },
  {
    imagem: 'img/icons/seguranca-icon.svg',
    titulo: 'Segurança Avançada',
    descricao: 'Autenticação robusta e criptografia de ponta a ponta'
  },]
}
