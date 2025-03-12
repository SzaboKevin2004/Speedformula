import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CsapatComponent } from './csapat.component';
import { of } from 'rxjs';

describe('CsapatComponent', () => {
  let component: CsapatComponent;
  let fixture: ComponentFixture<CsapatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsapatComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(CsapatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
