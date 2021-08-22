import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProfileDataComponent } from './preview-profile-data.component';

describe('PreviewProfileDataComponent', () => {
  let component: PreviewProfileDataComponent;
  let fixture: ComponentFixture<PreviewProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewProfileDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
