import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Import model from centralized folder
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://localhost:5000/patient/appointments';

  constructor(private http: HttpClient) {}

  // ✅ Book new appointment
  bookAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}`, appointment);
  }

  // ✅ Get appointments for a patient
  getAppointmentsByPatient(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`https://localhost:5000/patient/appointments/patient/${patientId}`);
  }

  // ✅ Get appointments for a doctor (by date)
  getAppointmentsByDoctor(doctorName: string, date: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`https://localhost:5000/doctor/appointments/doctor/${doctorName}?date=${date}`);
  }

  // ✅ Update appointment status (Completed / Cancelled)
  updateAppointmentStatus(id: number, status: string): Observable<any> {
    return this.http.put(`https://localhost:5000/appointment/appointments/${id}/status`, { status });
  }

  // ✅ Get today’s appointments
  getTodayAppointments(): Observable<Appointment[]> {
    const today = new Date().toISOString().split('T')[0]; // yyyy-MM-dd
    return this.http.get<Appointment[]>(`https://localhost:5000/appointment/appointments?date=${today}`);
  }
}
