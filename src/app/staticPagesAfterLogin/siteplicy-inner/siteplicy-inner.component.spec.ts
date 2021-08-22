import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteplicyInnerComponent } from './siteplicy-inner.component';

describe('SiteplicyInnerComponent', () => {
  let component: SiteplicyInnerComponent;
  let fixture: ComponentFixture<SiteplicyInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteplicyInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteplicyInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
