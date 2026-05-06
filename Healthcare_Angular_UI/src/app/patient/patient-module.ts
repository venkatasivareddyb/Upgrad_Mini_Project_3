import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import standalone components
import { PatientDashboard } from './patient-dashboard/patient-dashboard';
import { PatientAppointments } from './patient-appointments/patient-appointments';
import { PatientReports } from './patient-reports/patient-reports';
import { PatientBillings } from './patient-billings/patient-billings';
import { PatientProfile } from './patient-profile/patient-profile';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PatientDashboard },
      { path: 'appointments', component: PatientAppointments },
      { path: 'reports', component: PatientReports },
      { path: 'billings', component: PatientBillings },
      { path: 'profile', component: PatientProfile }
    ])
  ],
  declarations: [
  ]
})
export class PatientModule {}
