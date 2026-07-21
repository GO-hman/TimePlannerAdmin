import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeControllerService } from '../../../../api/services/employeeController.service';
import { firstValueFrom } from 'rxjs';
import { EmployeeViewInput } from '../../../../api';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  private employeeService = inject(EmployeeControllerService);
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

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    var employee = this.form.getRawValue() as EmployeeViewInput;

    try {
      var response = await firstValueFrom(this.employeeService.createEmployee(employee));
      await console.log(response);
      this.router.navigate(['/users']);
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      this.errorMessage = httpError.error?.message ?? httpError.message;
      this.cdr.detectChanges();
    }
  }
}
