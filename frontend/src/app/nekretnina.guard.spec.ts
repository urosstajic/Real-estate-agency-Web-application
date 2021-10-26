import { TestBed } from '@angular/core/testing';

import { NekretninaGuard } from './nekretnina.guard';

describe('NekretninaGuard', () => {
  let guard: NekretninaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NekretninaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
