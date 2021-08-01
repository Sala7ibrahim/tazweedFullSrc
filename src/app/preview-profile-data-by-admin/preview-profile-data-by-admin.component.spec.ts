import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProfileDataByAdminComponent } from './preview-profile-data-by-admin.component';

describe('PreviewProfileDataByAdminComponent', () => {
  let component: PreviewProfileDataByAdminComponent;
  let fixture: ComponentFixture<PreviewProfileDataByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewProfileDataByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewProfileDataByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
