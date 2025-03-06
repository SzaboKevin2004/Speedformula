import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatokComponent } from './csapatok.component';

describe('CsapatokComponent', () => {
  let component: CsapatokComponent;
  let fixture: ComponentFixture<CsapatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsapatokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsapatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
