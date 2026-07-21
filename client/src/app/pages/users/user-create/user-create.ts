import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeControllerService } from '../../../../api/services/employeeController.service';
import { firstValueFrom } from 'rxjs';
import { EmployeeViewInput } from '../../../../api';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  private employeeService = inject(EmployeeControllerService);

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

    var response = await firstValueFrom(this.employeeService.createEmployee(employee));

    await console.log(response);
  }
}
