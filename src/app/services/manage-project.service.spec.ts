import { TestBed } from '@angular/core/testing';

import { ManageProjectService } from './manage-project.service';

describe('ManageProjectService', () => {
  let service: ManageProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
