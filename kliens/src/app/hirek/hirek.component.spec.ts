import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HirekComponent } from './hirek.component';
import { of } from 'rxjs';

describe('HirekComponent', () => {
  let component: HirekComponent;
  let fixture: ComponentFixture<HirekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HirekComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '456' }) },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HirekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
