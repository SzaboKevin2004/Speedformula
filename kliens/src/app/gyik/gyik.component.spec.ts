import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GyikComponent } from './gyik.component';
import { of } from 'rxjs';

describe('GyikComponent', () => {
  let component: GyikComponent;
  let fixture: ComponentFixture<GyikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GyikComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '101' }) },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GyikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
