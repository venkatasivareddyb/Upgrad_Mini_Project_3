import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Billing } from '../../models/billing';   // ✅ use shared model

@Component({
  selector: 'app-admin-billings-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-billings-upload.html',
  styleUrls: ['./admin-billings-upload.css']
})
export class AdminBillingsUpload {
  selectedFile: File | null = null;
  uploadedBillings: Billing[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadBilling() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<Billing>('https://localhost:5000/appointment/billings/upload', formData)
      .subscribe({
        next: (billing) => {
          alert('Billing file uploaded successfully');
          this.uploadedBillings.push(billing); // ✅ store uploaded billing record
        },
        error: (err) => console.error('Error uploading billing file:', err)
      });
  }
}
