import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://localhost:5000/doctor/doctors';

  constructor(private http: HttpClient) {}

  // ✅ Get all doctors
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // ✅ Get doctor by ID
  getDoctorById(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${doctorId}`);
  }

  // ✅ Validate doctor (Admin action)
  validateDoctor(doctorId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/validate/${doctorId}`, {});
  }

  // ✅ Update doctor profile
  updateDoctorProfile(doctorId: number, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${doctorId}`, profileData);
  }

  // ✅ Set doctor timings (two shifts)
  setDoctorTimings(doctorId: number, timings: { morning: string; evening: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/timings/${doctorId}`, timings);
  }

  // ✅ Get doctor’s appointments
  getDoctorAppointments(doctorId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${doctorId}/appointments?date=${date}`);
  }
}
