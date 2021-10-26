import { TestBed } from '@angular/core/testing';

import { PocetniGuardGuard } from './pocetni-guard.guard';

describe('PocetniGuardGuard', () => {
  let guard: PocetniGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PocetniGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
