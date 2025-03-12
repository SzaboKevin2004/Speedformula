import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VersenyzoComponent } from './versenyzo.component';
import { of } from 'rxjs';

describe('VersenyzoComponent', () => {
  let component: VersenyzoComponent;
  let fixture: ComponentFixture<VersenyzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersenyzoComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VersenyzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
