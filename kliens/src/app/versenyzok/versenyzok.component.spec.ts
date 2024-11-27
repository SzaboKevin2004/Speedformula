import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersenyzokComponent } from './versenyzok.component';

describe('VersenyzokComponent', () => {
  let component: VersenyzokComponent;
  let fixture: ComponentFixture<VersenyzokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersenyzokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersenyzokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
