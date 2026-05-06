import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Report } from '../../models/report';

@Component({
  selector: 'app-patient-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-reports.html',
  styleUrls: ['./patient-reports.css']
})
export class PatientReports implements OnInit {
  reports: Report[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch reports from backend API
    this.http.get<Report[]>('https://localhost:5000/patient/reports/patient/12345')
      .subscribe({
        next: (data) => this.reports = data,
        error: (err) => console.error('Error fetching reports:', err)
      });
  }
}
