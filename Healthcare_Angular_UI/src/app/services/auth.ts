import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  // ✅ Login
  login(credentials: { email: string; password: string }): Observable<{ token: string; role: string; isApproved?: boolean }> {
    return this.http.post<{ token: string; role: string; isApproved?: boolean }>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  // ✅ Register (with name, email, password, role, specialization)
  register(data: { name: string; email: string; password: string; role: string; specialization?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  // ✅ Save token & role locally
  saveAuthData(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  // ✅ Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Get role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ✅ Clear auth data (logout)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  // ✅ Check if logged in
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
