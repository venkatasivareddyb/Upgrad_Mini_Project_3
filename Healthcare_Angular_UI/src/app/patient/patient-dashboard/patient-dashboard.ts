import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-dashboard.html',
  styleUrls: ['./patient-dashboard.css']
})
export class PatientDashboard implements OnInit {
  doctors: Doctor[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // ✅ Call your backend API to fetch doctors
    this.http.get<Doctor[]>('https://localhost:5000/patient/doctors')
      .subscribe({
        next: (data) => this.doctors = data,
        error: (err) => console.error('Error fetching doctors:', err)
      });
  }

  bookAppointment(doctor: Doctor) {
    if (doctor.validated) {
      // Navigate to appointment booking page with doctor info
      this.router.navigate(['/appointment'], { state: { doctor } });
    } else {
      alert('Your selected doctor is not yet validated by Admin.');
    }
  }
}
