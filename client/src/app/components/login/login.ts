import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserLoginViewInput } from '../../../api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.auth.login(this.loginForm.value as UserLoginViewInput).subscribe({
      next: (response) => {
        this.auth.setSession(response.token!, response.expiresIn!);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => alert('Login failed'),
    });
  }
}
