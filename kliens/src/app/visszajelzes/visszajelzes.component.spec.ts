import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VisszajelzesComponent } from './visszajelzes.component';
import { of } from 'rxjs';

describe('VisszajelzesComponent', () => {
  let component: VisszajelzesComponent;
  let fixture: ComponentFixture<VisszajelzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisszajelzesComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VisszajelzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
