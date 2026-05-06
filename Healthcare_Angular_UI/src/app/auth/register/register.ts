import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() success = new EventEmitter<string>();

  user = {
    name: '',
    email: '',
    password: '',
    role: '',
    specialization: ''
  };

  showSpecialization = false;

  // Show specialization only if Doctor is selected
  onRoleChange() {
    this.showSpecialization = this.user.role === 'Doctor';
  }

  // Handle registration flow
  submit() {
    if (this.user.role === 'Patient') {
      this.success.emit('Registration successful! Please login again as Patient.');
    } else if (this.user.role === 'Doctor') {
      this.success.emit('Registration submitted! Awaiting Admin approval. You will receive an email once validated.');
    } else {
      alert('Please select a role before submitting.');
      return;
    }
    console.log('User registered:', this.user);
  }
}
