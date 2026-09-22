import { Component } from '@angular/core';
import { SchedulerComponent } from '../../scheduler/scheduler';

@Component({
  selector: 'app-assignments',
  imports: [SchedulerComponent],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
})
export class Assignments {}
