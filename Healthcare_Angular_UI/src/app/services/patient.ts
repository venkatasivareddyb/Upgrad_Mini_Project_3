import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'https://localhost:5000/patient/patients';

  constructor(private http: HttpClient) {}

  // ✅ Get all patients
  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // ✅ Get patient by ID
  getPatientById(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${patientId}`);
  }

  // ✅ Update patient profile
  updatePatientProfile(patientId: number, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${patientId}`, profileData);
  }

  // ✅ Get patient’s appointments
  getPatientAppointments(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/appointments`);
  }

  // ✅ Book appointment (delegates to Appointment API)
  bookAppointment(patientId: number, appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/appointments`, appointmentData);
  }
}
