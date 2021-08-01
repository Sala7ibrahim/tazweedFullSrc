import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyProjectComponent } from './manage-my-project.component';

describe('ManageMyProjectComponent', () => {
  let component: ManageMyProjectComponent;
  let fixture: ComponentFixture<ManageMyProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMyProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
