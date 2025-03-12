import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RolunkComponent } from './rolunk.component';
import { of } from 'rxjs';

describe('RolunkComponent', () => {
  let component: RolunkComponent;
  let fixture: ComponentFixture<RolunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolunkComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(RolunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
