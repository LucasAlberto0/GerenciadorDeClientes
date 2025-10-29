import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDaGaleraComponent } from './feedback-da-galera.component';

describe('FeedbackDaGaleraComponent', () => {
  let component: FeedbackDaGaleraComponent;
  let fixture: ComponentFixture<FeedbackDaGaleraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackDaGaleraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackDaGaleraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
