import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.css']
})
export class AppointmentForm implements OnInit {
  appointment: Appointment = {
    id: 0,
    patientId: '',        // auto-filled
    doctorName: '',       // ✅ doctor name
    specialization: '',   // ✅ specialization
    date: '',
    time: '',
    shift: '',            // ✅ added shift
    status: 'Booked'      // ✅ required property, default value
  };

  availableTimes: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.appointment.patientId = localStorage.getItem('patientId') || 'P12345678';
    this.appointment.date = new Date().toISOString().split('T')[0];
  }

  onShiftChange() {
    if (this.appointment.shift === 'Morning') {
      this.availableTimes = ['10:00', '11:00', '12:00', '13:00', '14:00'];
    } else if (this.appointment.shift === 'Evening') {
      this.availableTimes = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    } else {
      this.availableTimes = [];
    }
  }

  bookAppointment() {
    this.http.post<Appointment>('https://localhost:5000/patient/appointments', this.appointment)
      .subscribe({
        next: () => {
          alert('Appointment booked successfully!');
          this.router.navigate(['/patient/dashboard']);
        },
        error: (err) => console.error('Error booking appointment:', err)
      });
  }
}
