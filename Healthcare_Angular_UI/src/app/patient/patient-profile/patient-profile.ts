import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Patient } from '../../models/patient';
@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-profile.html',
  styleUrls: ['./patient-profile.css']
})
export class PatientProfile implements OnInit {
  patient: Patient | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch patient details from backend API
    this.http.get<Patient>('https://localhost:5000/patient/patients/12345')
      .subscribe({
        next: (data) => this.patient = data,
        error: (err) => console.error('Error fetching patient profile:', err)
      });
  }

  updatePassword() {
    alert('Password reset functionality triggered.');
    // TODO: Call backend API for password reset
  }
}
