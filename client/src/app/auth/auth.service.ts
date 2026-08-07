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

interface SessionToken {
  token: string;
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private sessionKey = 'session';

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
    localStorage.removeItem(this.sessionKey);
    this.router.navigate(['/login']);
  }

  setSession(token: string, expiresIn: number): void {
    const session: SessionToken = { token, expiresAt: Date.now() + expiresIn };
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  getToken(): string | null {
    return this.getSession()?.token ?? null;
  }

  isTokenExpired(): boolean {
    const session = this.getSession();
    return !session || Date.now() >= session.expiresAt;
  }

  private getSession(): SessionToken | null {
    const raw = localStorage.getItem(this.sessionKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as SessionToken;
    } catch {
      return null;
    }
  }
}
