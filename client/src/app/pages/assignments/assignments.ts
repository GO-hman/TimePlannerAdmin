import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  AssignmentControllerService,
  AssignmentViewInput,
  AssignmentViewOutput,
  UserControllerService,
  UserViewOutput,
} from '../../../api';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInput } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';

interface FormBuilderData {}

@Component({
  selector: 'app-assignments',
  imports: [
    MatFormFieldModule,
    MatSelect,
    MatOption,
    MatTimepickerModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './assignments.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './assignments.css',
})
export class Assignments {
  private userService = inject(UserControllerService);
  private assignmentService = inject(AssignmentControllerService);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);

  errors = signal<HttpErrorResponse | undefined>(undefined);
  loading = signal<boolean>(false);
  users = signal<UserViewOutput[]>([]);
  assignments = signal<AssignmentViewOutput[]>([]);
  selectedUserId = signal<string | undefined>(undefined);
  selectedUser = computed(() => this.users().find((u) => u.id === this.selectedUserId()));

  displayedColumns = ['user', 'startTime', 'endTime', 'actions'];

  form = this.formBuilder.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    user: ['', Validators.required],
  });

  async onSubmit() {
    var stuff = this.form.getRawValue();
    var user = this.users().find((u) => u.id === stuff.user);
    if (!user) {
      return;
    }
    this.loading.set(true);

    var formData: AssignmentViewInput = {
      startTime: new Date(stuff.startTime!),
      endTime: new Date(stuff.endTime!),
      user: user,
    };

    try {
      var response = await firstValueFrom(this.assignmentService.createAssignment(formData));
      this.assignments.update((current) => [...current, response]);
    } catch (e) {
      const httpError = e as HttpErrorResponse;
      this.errors.set(httpError);
    } finally {
      this.loading.set(false);
    }
  }

  async onDelete(assignment: AssignmentViewOutput) {
    this.loading.set(true);
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Radera användare',
        message: `Är du säker på att du vill ta bort bokningen?`,
        confirmText: 'Radera',
      },
    });

    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (!confirmed) {
        return;
      }

      await firstValueFrom(this.assignmentService.deleteById(assignment.id));
      this.assignments.update((assign) => assign.filter((a) => a.id !== assignment.id));
    });
    this.loading.set(false);
  }

  async fetchUsers() {
    this.loading.set(true);
    try {
      this.users.set(await firstValueFrom(this.userService.getAll()));
    } catch (e) {
      const error = e as HttpErrorResponse;
      this.errors.set(error);
      console.log(this.errors());
    } finally {
      this.loading.set(false);
    }
  }

  constructor() {
    effect(() => {
      this.selectedUserId();
      this.fetchAssignments();
    });
  }

  async fetchAssignments() {
    const userId = this.selectedUserId();
    if (!userId) {
      this.assignments.set([]);
      return;
    }
    this.loading.set(true);
    try {
      this.assignments.set(await firstValueFrom(this.assignmentService.getByUserId(userId)));
    } catch (e) {
      const error = e as HttpErrorResponse;
      this.errors.set(error);
    } finally {
      this.loading.set(false);
    }
  }

  async ngOnInit() {
    await this.fetchUsers();
  }
}
