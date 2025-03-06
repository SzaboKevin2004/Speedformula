import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersenyzoComponent } from './versenyzo.component';

describe('VersenyzoComponent', () => {
  let component: VersenyzoComponent;
  let fixture: ComponentFixture<VersenyzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersenyzoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersenyzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
