import { ChangeDetectorRef, Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  private userService = inject(UserControllerService);
  private authService = inject(AuthenticationControllerService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  errorMessage = '';

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

    var user = this.form.getRawValue() as UserRegistrationViewInput;

    try {
      var response = await firstValueFrom(this.authService.register(user));
      console.log(response);
      this.router.navigate(['/dashboard/users']);
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      this.errorMessage = httpError.error?.message ?? httpError.message;
      this.cdr.detectChanges();
    }
  }
}
