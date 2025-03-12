import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { KezdolapComponent } from './kezdolap.component';
import { of } from 'rxjs';

describe('KezdolapComponent', () => {
  let component: KezdolapComponent;
  let fixture: ComponentFixture<KezdolapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        KezdolapComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KezdolapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
