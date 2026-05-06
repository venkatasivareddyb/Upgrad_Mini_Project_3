import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorPatientDetails } from './admin-doctor-patient-details';

describe('AdminDoctorPatientDetails', () => {
  let component: AdminDoctorPatientDetails;
  let fixture: ComponentFixture<AdminDoctorPatientDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDoctorPatientDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDoctorPatientDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
