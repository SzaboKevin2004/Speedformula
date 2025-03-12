import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TortenetComponent } from './tortenet.component';
import { of } from 'rxjs';

describe('TortenetComponent', () => {
  let component: TortenetComponent;
  let fixture: ComponentFixture<TortenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TortenetComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TortenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
