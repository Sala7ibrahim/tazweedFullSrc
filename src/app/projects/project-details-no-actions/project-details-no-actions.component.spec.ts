import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsNoActionsComponent } from './project-details-no-actions.component';

describe('ProjectDetailsNoActionsComponent', () => {
  let component: ProjectDetailsNoActionsComponent;
  let fixture: ComponentFixture<ProjectDetailsNoActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailsNoActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsNoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
