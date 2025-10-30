import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback-da-galera',
  imports: [],
  templateUrl: './feedback-da-galera.component.html',
  styleUrl: './feedback-da-galera.component.scss'
})
export class FeedbackDaGaleraComponent {
  
  usuarios = [{
    feedback: '"O Albertech revolucionou nossa forma de gerenciar clientes. Agora tudo é mais rápido e organizado! A produtividade aumentou 45% no primeiro mês."',
    autor: 'Vinicius',
    subtitulo: 'Tech Lead Back-End - Mosten',
    estrela: 5
  },
  {
    feedback: '"Interface intuitiva e recursos poderosos. Economizamos horas de trabalho todos os dias! O ROI foi positivo em apenas 3 semanas."',
    autor: 'Felipe',
    subtitulo: 'Tech Lead Front-End - Mosten',
    estrela: 5
  },
  {
    feedback: '"Suporte excepcional e plataforma extremamente confiável. Recomendo para todas as empresas! Nossa taxa de conversão dobrou."',
    autor: 'Edson',
    subtitulo: 'Gestor de QA - Mosten',
    estrela: 5
  }
]

}
