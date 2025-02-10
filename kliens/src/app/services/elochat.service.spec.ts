import { TestBed } from '@angular/core/testing';

import { ElochatService } from './elochat.service';

describe('ElochatService', () => {
  let service: ElochatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElochatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
