import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HibaComponent } from './hiba.component';
import { of } from 'rxjs';

describe('HibaComponent', () => {
  let component: HibaComponent;
  let fixture: ComponentFixture<HibaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HibaComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '789' }) },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
