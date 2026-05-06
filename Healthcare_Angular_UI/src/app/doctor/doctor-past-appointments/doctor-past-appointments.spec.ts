import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPastAppointments } from './doctor-past-appointments';

describe('DoctorPastAppointments', () => {
  let component: DoctorPastAppointments;
  let fixture: ComponentFixture<DoctorPastAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPastAppointments],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorPastAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
