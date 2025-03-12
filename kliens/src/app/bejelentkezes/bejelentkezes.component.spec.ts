import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BejelentkezesComponent } from './bejelentkezes.component';
import { of } from 'rxjs';

describe('BejelentkezesComponent', () => {
  let component: BejelentkezesComponent;
  let fixture: ComponentFixture<BejelentkezesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BejelentkezesComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(BejelentkezesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
