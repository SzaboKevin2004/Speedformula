import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortenetComponent } from './tortenet.component';

describe('TortenetComponent', () => {
  let component: TortenetComponent;
  let fixture: ComponentFixture<TortenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TortenetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TortenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
