// All times in the scheduler are minutes since midnight.
// Convert to/from Date objects only at the edges (API calls).

export const DAY_START = 6 * 60; // 06:00
export const DAY_END = 22 * 60; // 22:00
export const SNAP = 15; // minutes

/** Position (0–100) of a minute value along the visible day, for CSS left/width. */
export function pct(minutes: number): number {
  return ((minutes - DAY_START) / (DAY_END - DAY_START)) * 100;
}

/** Round to the nearest snap increment. */
export function snapMinutes(minutes: number): number {
  return Math.round(minutes / SNAP) * SNAP;
}

/** e.g. 570 -> "09:30" */
export function formatTime(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

/** Ready-to-bind left/width/label for a [start, end) minute range block. */
export function rangeStyle(
  startMinutes: number,
  endMinutes: number,
): { left: number; width: number; label: string } {
  const left = pct(startMinutes);
  return {
    left,
    width: pct(endMinutes) - left,
    label: `${formatTime(startMinutes)}–${formatTime(endMinutes)}`,
  };
}

/** Ready-to-bind position/label for each hour tick on the ruler. */
export function tickMarks(): { pct: number; label: string }[] {
  const marks: { pct: number; label: string }[] = [];
  for (let h = Math.floor(DAY_START / 60); h <= Math.ceil(DAY_END / 60); h++) {
    const minutes = h * 60;
    marks.push({ pct: pct(minutes), label: formatTime(minutes) });
  }
  return marks;
}

export function toDate(day: Date, minutes: number): Date {
  const d = new Date(day);
  d.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return d;
}

/**
 * Reinterpret UTC timestamp and read back the real local Date.
 */
function reinterpretAsLocal(date: Date): Date {
  const utcInstant = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  return new Date(utcInstant);
}

export function toMinutesSinceMidnight(date: Date): number {
  const local = reinterpretAsLocal(date);
  return local.getHours() * 60 + local.getMinutes();
}

/** Whether an assignment's start falls on the same calendar day as `day`, in real local time. */
export function isSameLocalDay(date: Date, day: Date): boolean {
  const local = reinterpretAsLocal(date);
  return (
    local.getFullYear() === day.getFullYear() &&
    local.getMonth() === day.getMonth() &&
    local.getDate() === day.getDate()
  );
}
