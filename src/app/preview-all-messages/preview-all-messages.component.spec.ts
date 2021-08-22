import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAllMessagesComponent } from './preview-all-messages.component';

describe('PreviewAllMessagesComponent', () => {
  let component: PreviewAllMessagesComponent;
  let fixture: ComponentFixture<PreviewAllMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAllMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAllMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
