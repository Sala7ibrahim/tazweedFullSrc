import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymestsComponent } from './paymests.component';

describe('PaymestsComponent', () => {
  let component: PaymestsComponent;
  let fixture: ComponentFixture<PaymestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
