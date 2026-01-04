import { timerMessages } from '@data/timer';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function calculateTimeRemaining(targetDate: number): TimeRemaining {
  const now = new Date().getTime();
  const diff = targetDate - now;
  const isPast = diff <= 0;
  const absDiff = Math.abs(diff);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast };
}

export function updateTimerDisplay(time: TimeRemaining): void {
  const daysElement = document.querySelector('[data-unit="days"]');
  const hoursElement = document.querySelector('[data-unit="hours"]');
  const minutesElement = document.querySelector('[data-unit="minutes"]');
  const secondsElement = document.querySelector('[data-unit="seconds"]');
  const timerMessageElement = document.querySelector('[data-timer-message]');

  if (daysElement) daysElement.textContent = String(time.days);
  if (hoursElement) hoursElement.textContent = String(time.hours);
  if (minutesElement) minutesElement.textContent = String(time.minutes);
  if (secondsElement) secondsElement.textContent = String(time.seconds);

  if (timerMessageElement) {
    timerMessageElement.textContent = time.isPast 
      ? timerMessages.past 
      : timerMessages.upcoming;
  }
}

function updateTimer(weddingDate: number): void {
  const timeRemaining = calculateTimeRemaining(weddingDate);
  updateTimerDisplay(timeRemaining);
}

export function initTimer(weddingDate: number): void {
  updateTimer(weddingDate);
  setInterval(() => updateTimer(weddingDate), 1000);
}

