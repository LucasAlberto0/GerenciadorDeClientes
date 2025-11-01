import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoCidadesComponent } from './grafico-cidades.component';

describe('GraficoCidadesComponent', () => {
  let component: GraficoCidadesComponent;
  let fixture: ComponentFixture<GraficoCidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoCidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoCidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
