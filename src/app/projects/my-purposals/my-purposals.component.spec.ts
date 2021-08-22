import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPurposalsComponent } from './my-purposals.component';

describe('MyPurposalsComponent', () => {
  let component: MyPurposalsComponent;
  let fixture: ComponentFixture<MyPurposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPurposalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPurposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
