import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyikComponent } from './gyik.component';

describe('GyikComponent', () => {
  let component: GyikComponent;
  let fixture: ComponentFixture<GyikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GyikComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GyikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
