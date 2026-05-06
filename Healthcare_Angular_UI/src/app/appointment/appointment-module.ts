import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ✅ Import the standalone AppointmentForm component
import { AppointmentForm } from './appointment-form/appointment-form';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'form', component: AppointmentForm }  // route for booking form
    ])
  ],
  declarations: [
  ]
})
export class AppointmentModule {}
