import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeallitasokComponent } from './beallitasok.component';

describe('BeallitasokComponent', () => {
  let component: BeallitasokComponent;
  let fixture: ComponentFixture<BeallitasokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeallitasokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeallitasokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
