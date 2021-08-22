import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInnerComponent } from './footer-inner.component';

describe('FooterInnerComponent', () => {
  let component: FooterInnerComponent;
  let fixture: ComponentFixture<FooterInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
