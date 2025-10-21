import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaClientesComponent } from './tabela-clientes.component';

describe('TabelaClientesComponent', () => {
  let component: TabelaClientesComponent;
  let fixture: ComponentFixture<TabelaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
