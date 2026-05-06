import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTodayAppointments } from './doctor-today-appointments';

describe('DoctorTodayAppointments', () => {
  let component: DoctorTodayAppointments;
  let fixture: ComponentFixture<DoctorTodayAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorTodayAppointments],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorTodayAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
