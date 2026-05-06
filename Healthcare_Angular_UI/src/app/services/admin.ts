import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private doctorApiUrl = 'https://localhost:5000/appointment/doctors';
  private appointmentApiUrl = 'https://localhost:5000/appointment/appointments';
  private billingApiUrl = 'https://localhost:5000/appointment/billings';

  constructor(private http: HttpClient) {}

  // ✅ Approve doctor (uses Doctor API)
  approveDoctor(doctorId: number): Observable<any> {
    return this.http.put(`${this.doctorApiUrl}/approve/${doctorId}`, {});
  }

  // ✅ Get all pending doctors (Doctor API)
  getPendingDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.doctorApiUrl}/pending`);
  }

  // ✅ Set doctor timings (Doctor API)
  setDoctorTimings(doctorId: number, timings: any): Observable<any> {
    return this.http.put(`${this.doctorApiUrl}/timings/${doctorId}`, timings);
  }

  // ✅ View doctor-patient details (Appointment API)
  getDoctorPatientDetails(doctorId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.appointmentApiUrl}/doctor/${doctorId}?date=${date}`);
  }

  // ✅ Upload billing (Billing API)
  uploadBilling(billingData: any): Observable<any> {
    return this.http.post(`${this.billingApiUrl}/upload`, billingData);
  }
}
