import { TestBed } from '@angular/core/testing';

import { ZProdajaService } from './z-prodaja.service';

describe('ZProdajaService', () => {
  let service: ZProdajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZProdajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
