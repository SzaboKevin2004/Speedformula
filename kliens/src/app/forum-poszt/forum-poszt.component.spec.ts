import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPosztComponent } from './forum-poszt.component';

describe('ForumPosztComponent', () => {
  let component: ForumPosztComponent;
  let fixture: ComponentFixture<ForumPosztComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumPosztComponent]
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
