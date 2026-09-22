import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleRowComponent, ShiftDraft } from '../schedule-row/schedule-row';
import { tickMarks, formatTime, toDate, isSameLocalDay } from '../utils/time';
import {
  Assignment,
  AssignmentControllerService,
  AssignmentViewInput,
  UserControllerService,
  UserViewOutput,
} from '../../api';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule, ScheduleRowComponent],
  templateUrl: './scheduler.html',
  styleUrl: './scheduler.css',
})
export class SchedulerComponent {
  private userService = inject(UserControllerService);
  private assignmentService = inject(AssignmentControllerService);

  currentDay = signal<Date>(new Date());
  showHint = signal(true);
  users = signal<UserViewOutput[]>([]);
  loading = signal<boolean>(false);

  readonly ticks = tickMarks();

  constructor(private snackBar: MatSnackBar) {}

  async ngOnInit() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    this.loading.set(true);
    try {
      this.users.set(await firstValueFrom(this.userService.getAll()));
    } catch (e) {
      this.snackBar.open((e as HttpErrorResponse).message, undefined, { duration: 4000 });
    } finally {
      this.loading.set(false);
    }
  }

  async onShiftCreated(user: UserViewOutput, draft: ShiftDraft) {
    const assignment: AssignmentViewInput = {
      startTime: toDate(this.currentDay(), draft.start),
      endTime: toDate(this.currentDay(), draft.end),
      user,
    };

    this.loading.set(true);
    try {
      const created = await firstValueFrom(this.assignmentService.createAssignment(assignment));
      this.users.update((list) =>
        list.map((u) =>
          u.id === user.id ? { ...u, assignments: [...(u.assignments ?? []), created] } : u,
        ),
      );
      this.showHint.set(false);
      this.snackBar.open(
        `Skapade bokning för ${user.name}, ${formatTime(draft.start)}–${formatTime(draft.end)}`,
        undefined,
        { duration: 3200 },
      );
    } catch (e) {
      this.snackBar.open((e as HttpErrorResponse).message, undefined, { duration: 4000 });
    } finally {
      this.loading.set(false);
    }
  }

  onShiftRemoveRequested(user: UserViewOutput, shift: Assignment): void {
    // TODO: replace with a real DELETE to the backend; re-insert on error.
    this.snackBar.open(`Shift removed for ${user.name}`, 'Undo', { duration: 4000 });
  }

  assignmentsForDay(user: UserViewOutput): Assignment[] {
    return (user.assignments ?? []).filter((a) => isSameLocalDay(a.startTime!, this.currentDay()));
  }

  shiftDay(delta: number): void {
    const d = new Date(this.currentDay());
    d.setDate(d.getDate() + delta);
    this.currentDay.set(d);
  }
}
