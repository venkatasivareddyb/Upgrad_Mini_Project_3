import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';   // ✅ use shared model

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-profile.html',
  styleUrls: ['./doctor-profile.css']
})
export class DoctorProfile implements OnInit {
  doctor: Doctor | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // ✅ Fetch doctor profile from backend API
    this.http.get<Doctor>('https://localhost:5000/doctor/doctors/123')
      .subscribe({
        next: (data) => this.doctor = data,
        error: (err) => console.error('Error fetching doctor profile:', err)
      });
  }

  updatePassword() {
    alert('Password reset triggered.');
    // TODO: Call backend API for password reset
  }

  logout() {
    alert('Logging out...');
    this.router.navigate(['/login']);
  }
}
