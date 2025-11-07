import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesAdminComponent } from './informacoes-admin.component';

describe('InformacoesAdminComponent', () => {
  let component: InformacoesAdminComponent;
  let fixture: ComponentFixture<InformacoesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacoesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacoesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
