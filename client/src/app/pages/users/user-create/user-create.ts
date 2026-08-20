import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  AuthenticationControllerService,
  UserControllerService,
  UserRegistrationViewInput,
  UserViewInput,
} from '../../../../api';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-create',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatButton,
    MatLabel,
    MatInputModule,
    MatProgressSpinner,
  ],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  private userService = inject(UserControllerService);
  private authService = inject(AuthenticationControllerService);
  private router = inject(Router);

  errorMessage = signal('');
  loading = signal(false);

  private fb = inject(FormBuilder);

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    var user = this.form.getRawValue() as UserRegistrationViewInput;

    try {
      var response = await firstValueFrom(this.authService.register(user));
      console.log(response);
      this.router.navigate(['/dashboard/users']);
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      this.errorMessage.set(httpError.error?.message ?? httpError.message);
    } finally {
      this.loading.set(false);
    }
  }
}
