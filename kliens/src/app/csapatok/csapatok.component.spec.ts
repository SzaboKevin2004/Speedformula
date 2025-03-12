import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CsapatokComponent } from './csapatok.component';
import { of } from 'rxjs';

describe('CsapatokComponent', () => {
  let component: CsapatokComponent;
  let fixture: ComponentFixture<CsapatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsapatokComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(CsapatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
