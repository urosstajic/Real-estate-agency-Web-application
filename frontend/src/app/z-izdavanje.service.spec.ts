import { TestBed } from '@angular/core/testing';

import { ZIzdavanjeService } from './z-izdavanje.service';

describe('ZIzdavanjeService', () => {
  let service: ZIzdavanjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZIzdavanjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
