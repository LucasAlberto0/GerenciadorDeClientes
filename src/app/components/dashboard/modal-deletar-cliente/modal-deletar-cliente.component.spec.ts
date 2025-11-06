import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarClienteComponent } from './modal-deletar-cliente.component';

describe('ModalDeletarClienteComponent', () => {
  let component: ModalDeletarClienteComponent;
  let fixture: ComponentFixture<ModalDeletarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeletarClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
