import { TestBed } from '@angular/core/testing';

import { InclusionService } from './inclusion.service';

describe('InclusionService', () => {
  let service: InclusionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InclusionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
