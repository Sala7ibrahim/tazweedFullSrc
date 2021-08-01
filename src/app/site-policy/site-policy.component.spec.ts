import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePolicyComponent } from './site-policy.component';

describe('SitePolicyComponent', () => {
  let component: SitePolicyComponent;
  let fixture: ComponentFixture<SitePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitePolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
