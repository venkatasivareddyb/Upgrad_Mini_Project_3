import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-appointments.html',
  styleUrls: ['./patient-appointments.css']
})
export class PatientAppointments implements OnInit {
  upcomingAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch appointments from backend API
    this.http.get<Appointment[]>('https://localhost:5000/patient/appointments/patient/12345')
      .subscribe({
        next: (data) => {
          // Separate upcoming vs past
          const today = new Date();
          this.upcomingAppointments = data.filter(a => new Date(a.date) >= today);
          this.pastAppointments = data.filter(a => new Date(a.date) < today);
        },
        error: (err) => console.error('Error fetching appointments:', err)
      });
  }
}
