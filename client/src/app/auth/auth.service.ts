import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  LoginResponse,
  User,
  UserLoginViewInput,
  UserRegistrationViewInput,
  UserViewOutput,
} from '../../api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(input: UserLoginViewInput): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, input);
  }

  register(input: UserRegistrationViewInput): Observable<UserViewOutput> {
    return this.http.post<UserViewOutput>(`${this.baseUrl}/auth/register`, input);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
