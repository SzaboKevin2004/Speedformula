import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HibaComponent } from './hiba.component';

describe('HibaComponent', () => {
  let component: HibaComponent;
  let fixture: ComponentFixture<HibaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HibaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
