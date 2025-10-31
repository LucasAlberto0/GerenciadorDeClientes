import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualidadesAlbertechComponent } from './qualidades-albertech.component';

describe('QualidadesAlbertechComponent', () => {
  let component: QualidadesAlbertechComponent;
  let fixture: ComponentFixture<QualidadesAlbertechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualidadesAlbertechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualidadesAlbertechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
