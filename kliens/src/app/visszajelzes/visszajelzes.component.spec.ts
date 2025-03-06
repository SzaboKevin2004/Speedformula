import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisszajelzesComponent } from './visszajelzes.component';

describe('VisszajelzesComponent', () => {
  let component: VisszajelzesComponent;
  let fixture: ComponentFixture<VisszajelzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisszajelzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisszajelzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
