import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoStatusComponent } from './grafico-status.component';

describe('GraficoStatusComponent', () => {
  let component: GraficoStatusComponent;
  let fixture: ComponentFixture<GraficoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
