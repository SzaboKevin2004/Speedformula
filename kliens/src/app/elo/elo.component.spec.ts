import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EloComponent } from './elo.component';

describe('EloComponent', () => {
  let component: EloComponent;
  let fixture: ComponentFixture<EloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
