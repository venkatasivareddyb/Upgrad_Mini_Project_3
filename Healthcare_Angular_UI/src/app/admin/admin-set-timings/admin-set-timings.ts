import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../../models/doctor';   // ✅ shared model

@Component({
  selector: 'app-admin-set-timings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-set-timings.html',
  styleUrls: ['./admin-set-timings.css']
})
export class AdminSetTimings implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch all doctors
    this.http.get<Doctor[]>('https://localhost:5000/appointment/doctors')
      .subscribe({
        next: (data) => this.doctors = data,
        error: (err) => console.error('Error fetching doctors:', err)
      });
  }

  setDefaultTimings(doctor: Doctor) {
    const timings = { morning: '10:00-14:00', evening: '16:00-21:00' };
    this.http.post(`https://localhost:5000/appointment/doctors/${doctor.id}/timings`, timings)
      .subscribe({
        next: () => alert(`Default timings set for ${doctor.name}`),
        error: (err) => console.error('Error setting timings:', err)
      });
  }

  updateTimings(doctor: Doctor, morningShift: string, eveningShift: string) {
    const timings = { morning: morningShift, evening: eveningShift };
    this.http.put(`https://localhost:5000/appointment/doctors/${doctor.id}/timings`, timings)
      .subscribe({
        next: () => alert(`Timings updated for ${doctor.name}`),
        error: (err) => console.error('Error updating timings:', err)
      });
  }
}
