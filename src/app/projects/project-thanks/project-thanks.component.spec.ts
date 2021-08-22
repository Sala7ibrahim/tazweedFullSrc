import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectThanksComponent } from './project-thanks.component';

describe('ProjectThanksComponent', () => {
  let component: ProjectThanksComponent;
  let fixture: ComponentFixture<ProjectThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectThanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
