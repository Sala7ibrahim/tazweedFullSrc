import { TestBed } from '@angular/core/testing';

import { ClientPolicyGuard } from './client-policy.guard';

describe('ClientPolicyGuard', () => {
  let guard: ClientPolicyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientPolicyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
