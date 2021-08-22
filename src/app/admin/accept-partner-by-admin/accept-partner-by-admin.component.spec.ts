import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPartnerByAdminComponent } from './accept-partner-by-admin.component';

describe('AcceptPartnerByAdminComponent', () => {
  let component: AcceptPartnerByAdminComponent;
  let fixture: ComponentFixture<AcceptPartnerByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptPartnerByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptPartnerByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
