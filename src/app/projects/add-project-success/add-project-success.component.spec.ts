import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectSuccessComponent } from './add-project-success.component';

describe('AddProjectSuccessComponent', () => {
  let component: AddProjectSuccessComponent;
  let fixture: ComponentFixture<AddProjectSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
