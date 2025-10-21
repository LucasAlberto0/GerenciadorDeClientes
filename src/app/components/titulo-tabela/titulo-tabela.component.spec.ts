import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloTabelaComponent } from './titulo-tabela.component';

describe('TituloTabelaComponent', () => {
  let component: TituloTabelaComponent;
  let fixture: ComponentFixture<TituloTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
