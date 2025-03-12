import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ForumService } from './forum.service';

describe('ForumService', () => {
  let service: ForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
