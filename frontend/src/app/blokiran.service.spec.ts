import { TestBed } from '@angular/core/testing';

import { BlokiranService } from './blokiran.service';

describe('BlokiranService', () => {
  let service: BlokiranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlokiranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
