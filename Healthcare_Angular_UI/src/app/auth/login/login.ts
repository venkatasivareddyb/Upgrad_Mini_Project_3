import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  @Output() success = new EventEmitter<string>();

  credentials = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  login() {
    this.http.post<any>('https://localhost:5000/auth/login', this.credentials)
      .subscribe({
        next: (res) => {
          this.success.emit(`Login successful! Welcome, ${res.role}.`);
        },
        error: (err) => {
          alert(err.error || 'Login failed. Please check your credentials.');
        }
      });
  }
}
