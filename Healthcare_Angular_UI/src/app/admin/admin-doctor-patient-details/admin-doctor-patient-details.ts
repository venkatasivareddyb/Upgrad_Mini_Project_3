import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointment';   //shared model
import { Doctor } from '../../models/doctor';             //shared model

@Component({
  selector: 'app-admin-doctor-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-doctor-patient-details.html',
  styleUrls: ['./admin-doctor-patient-details.css']
})
export class AdminDoctorPatientDetails implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;
  appointments: Appointment[] = [];

  todayDate: string = '';
  yesterdayDate: string = '';
  tomorrowDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch all doctors
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

  viewAppointments(doctor: Doctor, date: string) {
    this.selectedDoctor = doctor;
    this.http.get<Appointment[]>(`https://localhost:5000/appointment/appointments/doctor/${doctor.id}?date=${date}`)
      .subscribe({
        next: (data) => this.appointments = data,
        error: (err) => console.error('Error fetching appointments:', err)
      });
  }
}
