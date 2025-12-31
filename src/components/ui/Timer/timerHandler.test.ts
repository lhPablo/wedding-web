import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { calculateTimeRemaining, updateTimerDisplay, initTimer, type TimeRemaining } from './timerHandler';

function setupTimerDOM() {
  document.body.innerHTML = `
    <span data-unit="days"></span>
    <span data-unit="hours"></span>
    <span data-unit="minutes"></span>
    <span data-unit="seconds"></span>
  `;
}

describe('calculateTimeRemaining', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return zeros when target date is in the past', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const pastDate = new Date('2025-12-19T12:00:00').getTime();
    const result = calculateTimeRemaining(pastDate);

    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should return zeros when target date is now', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const result = calculateTimeRemaining(now);

    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should calculate days correctly', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const futureDate = new Date('2025-12-25T12:00:00').getTime();
    const result = calculateTimeRemaining(futureDate);

    expect(result.days).toBe(5);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it('should calculate hours correctly', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const futureDate = new Date('2025-12-20T18:00:00').getTime();
    const result = calculateTimeRemaining(futureDate);

    expect(result.days).toBe(0);
    expect(result.hours).toBe(6);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it('should calculate minutes correctly', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const futureDate = new Date('2025-12-20T12:45:00').getTime();
    const result = calculateTimeRemaining(futureDate);

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(45);
    expect(result.seconds).toBe(0);
  });

  it('should calculate seconds correctly', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const futureDate = new Date('2025-12-20T12:00:30').getTime();
    const result = calculateTimeRemaining(futureDate);

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(30);
  });

  it('should calculate mixed time correctly', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    // 2 days, 5 hours, 30 minutes, 15 seconds later
    const futureDate = new Date('2025-12-22T17:30:15').getTime();
    const result = calculateTimeRemaining(futureDate);

    expect(result.days).toBe(2);
    expect(result.hours).toBe(5);
    expect(result.minutes).toBe(30);
    expect(result.seconds).toBe(15);
  });
});

describe('updateTimerDisplay', () => {
  beforeEach(() => {
    setupTimerDOM();
  });

  it('should update all timer elements', () => {
    const time: TimeRemaining = { days: 10, hours: 5, minutes: 30, seconds: 45 };
    updateTimerDisplay(time);

    expect(document.querySelector('[data-unit="days"]')?.textContent).toBe('10');
    expect(document.querySelector('[data-unit="hours"]')?.textContent).toBe('5');
    expect(document.querySelector('[data-unit="minutes"]')?.textContent).toBe('30');
    expect(document.querySelector('[data-unit="seconds"]')?.textContent).toBe('45');
  });

  it('should handle zero values', () => {
    const time: TimeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    updateTimerDisplay(time);

    expect(document.querySelector('[data-unit="days"]')?.textContent).toBe('0');
    expect(document.querySelector('[data-unit="hours"]')?.textContent).toBe('0');
    expect(document.querySelector('[data-unit="minutes"]')?.textContent).toBe('0');
    expect(document.querySelector('[data-unit="seconds"]')?.textContent).toBe('0');
  });

  it('should not throw when elements are missing', () => {
    document.body.innerHTML = '';

    const time: TimeRemaining = { days: 10, hours: 5, minutes: 30, seconds: 45 };
    expect(() => updateTimerDisplay(time)).not.toThrow();
  });
});

describe('initTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setupTimerDOM();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should update timer immediately on init', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const weddingDate = new Date('2025-12-25T12:00:00').getTime();
    initTimer(weddingDate);

    expect(document.querySelector('[data-unit="days"]')?.textContent).toBe('5');
  });

  it('should update timer every second', () => {
    const now = new Date('2025-12-20T12:00:00').getTime();
    vi.setSystemTime(now);

    const weddingDate = new Date('2025-12-20T12:00:05').getTime();
    initTimer(weddingDate);

    expect(document.querySelector('[data-unit="seconds"]')?.textContent).toBe('5');

    vi.advanceTimersByTime(1000);
    expect(document.querySelector('[data-unit="seconds"]')?.textContent).toBe('4');

    vi.advanceTimersByTime(1000);
    expect(document.querySelector('[data-unit="seconds"]')?.textContent).toBe('3');
  });
});
