import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { VisszajelzesService } from './visszajelzes.service';

describe('VisszajelzesService', () => {
  let service: VisszajelzesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(VisszajelzesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
