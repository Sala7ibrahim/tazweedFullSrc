import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqInnerComponent } from './faq-inner.component';

describe('FaqInnerComponent', () => {
  let component: FaqInnerComponent;
  let fixture: ComponentFixture<FaqInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
