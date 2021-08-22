import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcheiveComponent } from './archeive.component';

describe('ArcheiveComponent', () => {
  let component: ArcheiveComponent;
  let fixture: ComponentFixture<ArcheiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcheiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcheiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
