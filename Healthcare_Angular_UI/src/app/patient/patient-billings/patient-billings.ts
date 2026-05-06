import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Billing } from '../../models/billing';

@Component({
  selector: 'app-patient-billings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-billings.html',
  styleUrls: ['./patient-billings.css']
})
export class PatientBillings implements OnInit {
  billings: Billing[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ✅ Fetch billing records from backend API
    this.http.get<Billing[]>('https://localhost:5000/patient/billings/patient/12345')
      .subscribe({
        next: (data) => this.billings = data,
        error: (err) => console.error('Error fetching billings:', err)
      });
  }
}
