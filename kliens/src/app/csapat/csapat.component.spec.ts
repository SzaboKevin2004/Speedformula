import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatComponent } from './csapat.component';

describe('CsapatComponent', () => {
  let component: CsapatComponent;
  let fixture: ComponentFixture<CsapatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsapatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsapatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
