import { TestBed } from '@angular/core/testing';

import { InboxGuardGuard } from './inbox-guard.guard';

describe('InboxGuardGuard', () => {
  let guard: InboxGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InboxGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
