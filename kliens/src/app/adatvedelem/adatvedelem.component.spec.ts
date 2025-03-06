import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdatvedelemComponent } from './adatvedelem.component';

describe('AdatvedelemComponent', () => {
  let component: AdatvedelemComponent;
  let fixture: ComponentFixture<AdatvedelemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdatvedelemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdatvedelemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
