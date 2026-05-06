import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBillings } from './patient-billings';

describe('PatientBillings', () => {
  let component: PatientBillings;
  let fixture: ComponentFixture<PatientBillings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientBillings],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientBillings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
