import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConviteParaCadastroComponent } from './convite-para-cadastro.component';

describe('ConviteParaCadastroComponent', () => {
  let component: ConviteParaCadastroComponent;
  let fixture: ComponentFixture<ConviteParaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConviteParaCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConviteParaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
