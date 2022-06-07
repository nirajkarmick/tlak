import { TestBed } from '@angular/core/testing';

import { TravellersService } from './travellers.service';

describe('TravellersService', () => {
  let service: TravellersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravellersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
