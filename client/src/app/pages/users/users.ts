import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewOutput, UserControllerService } from '../../../api';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

interface ApiError {
  status: string;
  message: string;
}
@Component({
  selector: 'app-users',
  imports: [CommonModule, MatProgressSpinner, MatTableModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private userService = inject(UserControllerService);

  users = signal<UserViewOutput[]>([]);
  loading = signal<boolean>(false);
  errors = signal<ApiError | undefined>(undefined);
  displayedColumns = ['email', 'name'];

  async ngOnInit() {
    this.loading.set(true);
    try {
      this.users.set(await firstValueFrom(this.userService.getAll()));
    } catch (e) {
      const error = e as HttpErrorResponse;
      this.errors.set({ message: error.message, status: error.status.toString() });
      console.log(this.errors());
    } finally {
      this.loading.set(false);
    }
  }
}
