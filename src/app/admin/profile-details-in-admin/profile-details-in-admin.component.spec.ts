import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsInAdminComponent } from './profile-details-in-admin.component';

describe('ProfileDetailsInAdminComponent', () => {
  let component: ProfileDetailsInAdminComponent;
  let fixture: ComponentFixture<ProfileDetailsInAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDetailsInAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailsInAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
