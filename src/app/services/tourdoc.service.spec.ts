import { TestBed } from '@angular/core/testing';

import { TourdocService } from './tourdoc.service';

describe('TourdocService', () => {
  let service: TourdocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourdocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
