import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointment';  // ✅ shared model

@Component({
  selector: 'app-doctor-today-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-today-appointments.html',
  styleUrls: ['./doctor-today-appointments.css']
})
export class DoctorTodayAppointments implements OnInit {
  todayAppointments: Appointment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch doctor appointments from backend API
    this.http.get<Appointment[]>('https://localhost:5000/doctor/appointments/doctor/123')
      .subscribe({
        next: (data) => {
          const today = new Date().toDateString();
          this.todayAppointments = data.filter(a => new Date(a.date).toDateString() === today);
        },
        error: (err) => console.error('Error fetching today appointments:', err)
      });
  }
}
