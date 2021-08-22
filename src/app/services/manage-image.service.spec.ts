import { TestBed } from '@angular/core/testing';

import { ManageImageService } from './manage-image.service';

describe('ManageImageService', () => {
  let service: ManageImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
