import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VersenyzokComponent } from './versenyzok.component';
import { of } from 'rxjs';

describe('VersenyzokComponent', () => {
  let component: VersenyzokComponent;
  let fixture: ComponentFixture<VersenyzokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersenyzokComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VersenyzokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
