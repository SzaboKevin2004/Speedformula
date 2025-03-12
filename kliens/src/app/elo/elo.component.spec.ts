import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EloComponent } from './elo.component';
import { of } from 'rxjs';

describe('EloComponent', () => {
  let component: EloComponent;
  let fixture: ComponentFixture<EloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EloComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
