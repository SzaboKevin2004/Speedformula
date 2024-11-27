import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolunkComponent } from './rolunk.component';

describe('RolunkComponent', () => {
  let component: RolunkComponent;
  let fixture: ComponentFixture<RolunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolunkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
