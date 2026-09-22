import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRowComponent } from './schedule-row';

describe('ScheduleRowComponent', () => {
  let component: ScheduleRowComponent;
  let fixture: ComponentFixture<ScheduleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', { id: '1', name: 'Test User', email: 'test@example.com' });
    fixture.componentRef.setInput('shifts', []);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
