import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPartnerComponent } from './accept-partner.component';

describe('AcceptPartnerComponent', () => {
  let component: AcceptPartnerComponent;
  let fixture: ComponentFixture<AcceptPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
