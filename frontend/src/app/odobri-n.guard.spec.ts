import { TestBed } from '@angular/core/testing';

import { OdobriNGuard } from './odobri-n.guard';

describe('OdobriNGuard', () => {
  let guard: OdobriNGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OdobriNGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
