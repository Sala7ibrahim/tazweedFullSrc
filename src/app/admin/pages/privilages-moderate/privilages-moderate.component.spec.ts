import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilagesModerateComponent } from './privilages-moderate.component';

describe('PrivilagesModerateComponent', () => {
  let component: PrivilagesModerateComponent;
  let fixture: ComponentFixture<PrivilagesModerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivilagesModerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilagesModerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
