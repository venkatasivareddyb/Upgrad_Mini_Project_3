import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, Login, Register],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  activeAuthPopup = signal<null | 'login' | 'register'>(null);
  authMessage = signal('');

  openAuthPopup(type: 'login' | 'register') {
    this.activeAuthPopup.set(type);
    this.authMessage.set('');
  }

  closeAuthPopup() {
    this.activeAuthPopup.set(null);
  }

  onAuthSuccess(message: string) {
    this.authMessage.set(message);
    this.closeAuthPopup();
  }
}
