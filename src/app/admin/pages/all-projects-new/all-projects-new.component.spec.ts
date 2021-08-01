import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsNewComponent } from './all-projects-new.component';

describe('AllProjectsNewComponent', () => {
  let component: AllProjectsNewComponent;
  let fixture: ComponentFixture<AllProjectsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProjectsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjectsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
