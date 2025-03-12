import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RegisztracioComponent } from './regisztracio.component';
import { of } from 'rxjs';

describe('RegisztracioComponent', () => {
  let component: RegisztracioComponent;
  let fixture: ComponentFixture<RegisztracioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RegisztracioComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '123' }) }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisztracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
