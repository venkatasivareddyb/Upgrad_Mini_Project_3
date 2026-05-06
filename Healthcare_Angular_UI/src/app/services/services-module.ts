import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminService } from './admin';
import { AppointmentService } from './appointment';
import { AuthService } from './auth';
import { DoctorService } from './doctor';
import { PatientService } from './patient';

@NgModule({
  imports: [CommonModule],
  providers: [
    AdminService,
    AppointmentService,
    AuthService,
    DoctorService,
    PatientService
  ]
})
export class ServicesModule {}
