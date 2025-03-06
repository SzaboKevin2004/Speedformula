import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPosztReszletComponent } from './forum-poszt-reszlet.component';

describe('ForumPosztReszletComponent', () => {
  let component: ForumPosztReszletComponent;
  let fixture: ComponentFixture<ForumPosztReszletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumPosztReszletComponent]
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
