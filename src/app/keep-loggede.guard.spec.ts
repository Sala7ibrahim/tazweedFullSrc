import { TestBed } from '@angular/core/testing';

import { KeepLoggedeGuard } from './keep-loggede.guard';

describe('KeepLoggedeGuard', () => {
  let guard: KeepLoggedeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KeepLoggedeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
