import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteServicesInnerComponent } from './site-services-inner.component';

describe('SiteServicesInnerComponent', () => {
  let component: SiteServicesInnerComponent;
  let fixture: ComponentFixture<SiteServicesInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteServicesInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteServicesInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
