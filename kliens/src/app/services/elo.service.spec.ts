import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EloService } from './elo.service';

describe('EloService', () => {
  let service: EloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
