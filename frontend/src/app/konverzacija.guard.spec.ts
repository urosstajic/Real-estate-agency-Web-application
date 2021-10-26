import { TestBed } from '@angular/core/testing';

import { KonverzacijaGuard } from './konverzacija.guard';

describe('KonverzacijaGuard', () => {
  let guard: KonverzacijaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KonverzacijaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
