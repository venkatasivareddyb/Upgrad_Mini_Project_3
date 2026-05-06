import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReportsUpload } from './doctor-reports-upload';

describe('DoctorReportsUpload', () => {
  let component: DoctorReportsUpload;
  let fixture: ComponentFixture<DoctorReportsUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorReportsUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorReportsUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
