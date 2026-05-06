import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../models/report';   // ✅ use shared model

@Component({
  selector: 'app-doctor-reports-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-reports-upload.html',
  styleUrls: ['./doctor-reports-upload.css']
})
export class DoctorReportsUpload {
  selectedFile: File | null = null;
  uploadedReports: Report[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadReport() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<Report>('https://localhost:5000/doctor/reports/upload', formData)
      .subscribe({
        next: (report) => {
          alert('Report uploaded successfully');
          this.uploadedReports.push(report); // ✅ store uploaded report in local list
        },
        error: (err) => console.error('Error uploading report:', err)
      });
  }
}
