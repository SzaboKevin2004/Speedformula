import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ForumPosztComponent } from './forum-poszt.component';
import { of } from 'rxjs';

describe('ForumPosztComponent', () => {
  let component: ForumPosztComponent;
  let fixture: ComponentFixture<ForumPosztComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumPosztComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ id: '456' }) },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumPosztComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
