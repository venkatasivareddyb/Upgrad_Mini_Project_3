import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ✅ Import standalone components
import { DoctorDashboard } from './doctor-dashboard/doctor-dashboard';
import { DoctorProfile } from './doctor-profile/doctor-profile';
import { DoctorTodayAppointments } from './doctor-today-appointments/doctor-today-appointments';
import { DoctorPastAppointments } from './doctor-past-appointments/doctor-past-appointments';
import { DoctorReportsUpload } from './doctor-reports-upload/doctor-reports-upload';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DoctorDashboard },
      { path: 'profile', component: DoctorProfile },
      { path: 'today-appointments', component: DoctorTodayAppointments },
      { path: 'past-appointments', component: DoctorPastAppointments },
      { path: 'reports-upload', component: DoctorReportsUpload }
    ])
  ],
  declarations: [
  ]
})
export class DoctorModule {}
