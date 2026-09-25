import { Component, computed, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DAY_START,
  DAY_END,
  SNAP,
  rangeStyle,
  snapMinutes,
  toMinutesSinceMidnight,
} from '../utils/time';
import { Assignment, UserViewOutput } from '../../api';

/** Emitted by a row while the user is dragging, before it becomes a real Shift. */
export interface ShiftDraft {
  start: number;
  end: number;
}

@Component({
  selector: 'app-schedule-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-row.html',
  styleUrl: './schedule-row.css',
})
export class ScheduleRowComponent {
  user = input.required<UserViewOutput>();
  shifts = input.required<Assignment[]>();

  shiftCreated = output<ShiftDraft>();
  shiftRemoveRequested = output<Assignment>();

  track = viewChild.required<ElementRef<HTMLElement>>('track');

  /** Anchor + live cursor position of the current drag, in minutes. Null when not dragging. */
  private drag = signal<{ anchor: number; current: number } | null>(null);

  draftRange = computed(() => {
    const d = this.drag();
    if (!d) return null;
    return { start: Math.min(d.anchor, d.current), end: Math.max(d.anchor, d.current) };
  });

  readonly rangeStyle = rangeStyle;

  initials(name: string): string {
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  startMinutes(a: Assignment): number {
    return toMinutesSinceMidnight(a.startTime!);
  }
  endMinutes(a: Assignment): number {
    return toMinutesSinceMidnight(a.endTime!);
  }

  private minutesAt(event: PointerEvent): number {
    const rect = this.track().nativeElement.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    return snapMinutes(DAY_START + ratio * (DAY_END - DAY_START));
  }

  onPointerDown(event: PointerEvent): void {
    // Only start a paint gesture on the empty track, not on an existing block.
    if (event.button !== 0 || event.target !== event.currentTarget) return;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    const m = this.minutesAt(event);
    this.drag.set({ anchor: m, current: m });
  }

  onPointerMove(event: PointerEvent): void {
    const d = this.drag();
    if (!d) return;
    this.drag.set({ ...d, current: this.minutesAt(event) });
  }

  onPointerUp(event: PointerEvent): void {
    const range = this.draftRange();
    this.drag.set(null);
    if (!range) return;

    if (range.end - range.start < SNAP) return; // too short to count as a drag — treat as a stray click

    this.shiftCreated.emit(range);
  }

  onPointerCancel(): void {
    this.drag.set(null);
  }

  onShiftClick(shift: Assignment, event: MouseEvent): void {
    //TODO: Implement "edit" and "delete" buttons with functions if clicked.

    event.stopPropagation();
    // this.shiftRemoveRequested.emit(shift);
  }
}
