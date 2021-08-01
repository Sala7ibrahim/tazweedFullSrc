import { TestBed } from '@angular/core/testing';

import { UserPrivilageGuard } from './user-privilage.guard';

describe('UserPrivilageGuard', () => {
  let guard: UserPrivilageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPrivilageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
