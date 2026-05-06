import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointment';  // ✅ shared model

@Component({
  selector: 'app-doctor-past-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-past-appointments.html',
  styleUrls: ['./doctor-past-appointments.css']
})
export class DoctorPastAppointments implements OnInit {
  pastAppointments: Appointment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch doctor appointments from backend API
    this.http.get<Appointment[]>('https://localhost:5000/doctor/appointments/doctor/123')
      .subscribe({
        next: (data) => {
          const today = new Date();
          this.pastAppointments = data.filter(a => new Date(a.date) < today);
        },
        error: (err) => console.error('Error fetching past appointments:', err)
      });
  }
}
