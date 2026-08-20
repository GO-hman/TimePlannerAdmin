import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewOutput, UserControllerService } from '../../../api';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../confirm-dialog/confirm-dialog';

interface ApiError {
  status: string;
  message: string;
}
@Component({
  selector: 'app-users',
  imports: [CommonModule, MatProgressSpinner, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private userService = inject(UserControllerService);
  private dialog = inject(MatDialog);

  users = signal<UserViewOutput[]>([]);
  loading = signal<boolean>(false);
  errors = signal<ApiError | undefined>(undefined);
  displayedColumns = ['email', 'name', 'util'];

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

  onDelete(user: UserViewOutput) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Radera användare',
        message: `Är du säker på att du vill radera ${user.name} (${user.email})?`,
        confirmText: 'Radera',
      },
    });

    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (!confirmed) {
        return;
      }

      await firstValueFrom(this.userService.deleteUser(user.id!));
      this.users.update((users) => users.filter((u) => u.id !== user.id));
    });
  }
}
