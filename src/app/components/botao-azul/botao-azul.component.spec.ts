import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoAzulComponent } from './botao-azul.component';

describe('BotaoAzulComponent', () => {
  let component: BotaoAzulComponent;
  let fixture: ComponentFixture<BotaoAzulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoAzulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoAzulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
