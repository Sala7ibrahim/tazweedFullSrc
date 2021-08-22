import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAllMessagesAdminComponent } from './preview-all-messages-admin.component';

describe('PreviewAllMessagesAdminComponent', () => {
  let component: PreviewAllMessagesAdminComponent;
  let fixture: ComponentFixture<PreviewAllMessagesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAllMessagesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAllMessagesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
