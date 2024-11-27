import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirekComponent } from './hirek.component';

describe('HirekComponent', () => {
  let component: HirekComponent;
  let fixture: ComponentFixture<HirekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HirekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HirekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
