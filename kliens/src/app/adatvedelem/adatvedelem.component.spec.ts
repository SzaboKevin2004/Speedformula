import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AdatvedelemComponent } from './adatvedelem.component';
import { of } from 'rxjs';

describe('AdatvedelemComponent', () => {
  let component: AdatvedelemComponent;
  let fixture: ComponentFixture<AdatvedelemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdatvedelemComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdatvedelemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
