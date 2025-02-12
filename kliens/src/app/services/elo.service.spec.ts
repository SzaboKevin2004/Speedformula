import { TestBed } from '@angular/core/testing';

import { EloService } from './elo.service';

describe('EloService', () => {
  let service: EloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
