import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.css']
})
export class DoctorDashboard implements OnInit {
  todayAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // ✅ Fetch doctor appointments from backend API
    this.http.get<Appointment[]>('https://localhost:5000/doctor/appointments/doctor/123')
      .subscribe({
        next: (data) => {
          const today = new Date().toDateString();
          this.todayAppointments = data.filter(a => new Date(a.date).toDateString() === today);
          this.pastAppointments = data.filter(a => new Date(a.date) < new Date(today));
        },
        error: (err) => console.error('Error fetching appointments:', err)
      });
  }

  logout() {
    alert('Logging out...');
    this.router.navigate(['/login']);
  }
}
