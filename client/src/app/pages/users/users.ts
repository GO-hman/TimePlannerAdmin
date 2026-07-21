import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeControllerService, EmployeeViewOutput } from '../../../api';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface ApiError {
  status: string;
  message: string;
}
@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private employeeService = inject(EmployeeControllerService);

  employees = signal<EmployeeViewOutput[]>([]);
  loading = signal<boolean>(false);
  errors = signal<ApiError | undefined>(undefined);

  async ngOnInit() {
    this.loading.set(true);
    try {
      this.employees.set(await firstValueFrom(this.employeeService.getAll()));
    } catch (e) {
      const error = e as HttpErrorResponse;
      this.errors.set({ message: error.message, status: error.status.toString() });
      console.log(this.errors());
    } finally {
      this.loading.set(false);
    }
  }
}
