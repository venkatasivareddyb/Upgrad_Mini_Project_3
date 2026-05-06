import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../../models/doctor';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;
  doctorAppointments: Appointment[] = [];

  // ✅ Add date properties so template can bind
  todayDate: string = '';
  yesterdayDate: string = '';
  tomorrowDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Doctor[]>('https://localhost:5000/appointment/doctors')
      .subscribe({
        next: (data) => this.doctors = data,
        error: (err) => console.error('Error fetching doctors:', err)
      });

    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    this.yesterdayDate = yesterday.toISOString().split('T')[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }

  validateDoctor(doctor: Doctor) {
    this.http.post(`https://localhost:5000/appointment/doctors/${doctor.id}/validate`, {})
      .subscribe({
        next: () => {
          doctor.validated = true;
          alert(`${doctor.name} validated successfully`);
        },
        error: (err) => console.error('Error validating doctor:', err)
      });
  }

  setDoctorTimings(doctor: Doctor) {
    const timings = { morning: '10:00-14:00', evening: '16:00-21:00' };
    this.http.post(`https://localhost:5000/appointment/doctors/${doctor.id}/timings`, timings)
      .subscribe({
        next: () => alert(`Timings set for ${doctor.name}`),
        error: (err) => console.error('Error setting timings:', err)
      });
  }

  viewDoctorAppointments(doctor: Doctor, date: string) {
    this.selectedDoctor = doctor;
    this.http.get<Appointment[]>(`https://localhost:5000/appointment/appointments/doctor/${doctor.id}?date=${date}`)
      .subscribe({
        next: (data) => this.doctorAppointments = data,
        error: (err) => console.error('Error fetching appointments:', err)
      });
  }
}
