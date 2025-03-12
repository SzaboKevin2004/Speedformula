import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ForumPosztReszletComponent } from './forum-poszt-reszlet.component';
import { of } from 'rxjs';

describe('ForumPosztReszletComponent', () => {
  let component: ForumPosztReszletComponent;
  let fixture: ComponentFixture<ForumPosztReszletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumPosztReszletComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(ForumPosztReszletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
