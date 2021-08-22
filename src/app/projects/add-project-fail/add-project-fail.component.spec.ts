import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectFailComponent } from './add-project-fail.component';

describe('AddProjectFailComponent', () => {
  let component: AddProjectFailComponent;
  let fixture: ComponentFixture<AddProjectFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
