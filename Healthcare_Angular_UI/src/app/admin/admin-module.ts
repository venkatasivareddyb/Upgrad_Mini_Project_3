import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Import standalone admin components
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminValidateDoctor } from './admin-validate-doctor/admin-validate-doctor';
import { AdminSetTimings } from './admin-set-timings/admin-set-timings';
import { AdminDoctorPatientDetails } from './admin-doctor-patient-details/admin-doctor-patient-details';
import { AdminBillingsUpload } from './admin-billings-upload/admin-billings-upload';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdminDashboard },
      { path: 'validate-doctor', component: AdminValidateDoctor },
      { path: 'set-timings', component: AdminSetTimings },
      { path: 'doctor-patient-details', component: AdminDoctorPatientDetails },
      { path: 'billings-upload', component: AdminBillingsUpload }
    ])
  ],
  declarations: [
  ]
})
export class AdminModule {}
