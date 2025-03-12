import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AuthService } from './auth.service'; // Adjust the path if needed

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Add HttpClientModule to the imports
    });
    service = TestBed.inject(AuthService); // Inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Check if the service is created successfully
  });
});
