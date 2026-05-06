import { Routes } from '@angular/router';

import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

// ✅ Root routes configuration
export const routes: Routes = [
  //Doctor Module
  {
    path: 'doctor',
    canActivate: [authGuard, roleGuard],
    data: { role: 'Doctor' },
    loadChildren: () =>
      import('./doctor/doctor-module').then(m => m.DoctorModule)
  },

  //Patient Module
  {
    path: 'patient',
    canActivate: [authGuard, roleGuard],
    data: { role: 'Patient' },
    loadChildren: () =>
      import('./patient/patient-module').then(m => m.PatientModule)
  },

  //Admin Module
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'Admin' },
    loadChildren: () =>
      import('./admin/admin-module').then(m => m.AdminModule)
  },

  //Appointment Module
  {
    path: 'appointments',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./appointment/appointment-module').then(m => m.AppointmentModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
