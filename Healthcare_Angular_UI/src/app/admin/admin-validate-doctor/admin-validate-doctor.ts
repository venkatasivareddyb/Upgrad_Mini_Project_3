import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../../models/doctor';   // ✅ shared model

@Component({
  selector: 'app-admin-validate-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-validate-doctor.html',
  styleUrls: ['./admin-validate-doctor.css']
})
export class AdminValidateDoctor implements OnInit {
  doctors: Doctor[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch all doctors
    this.http.get<Doctor[]>('https://localhost:5000/appointment/doctors')
      .subscribe({
        next: (data) => this.doctors = data,
        error: (err) => console.error('Error fetching doctors:', err)
      });
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
}
