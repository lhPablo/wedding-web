interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(targetDate: number): TimeRemaining {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(time: TimeRemaining): void {
  const daysElement = document.querySelector('[data-unit="days"]');
  const hoursElement = document.querySelector('[data-unit="hours"]');
  const minutesElement = document.querySelector('[data-unit="minutes"]');
  const secondsElement = document.querySelector('[data-unit="seconds"]');

  if (daysElement) daysElement.textContent = String(time.days);
  if (hoursElement) hoursElement.textContent = String(time.hours);
  if (minutesElement) minutesElement.textContent = String(time.minutes);
  if (secondsElement) secondsElement.textContent = String(time.seconds);
}

export function initTimer(weddingDate: number): void {
  function updateTimer() {
    const timeRemaining = calculateTimeRemaining(weddingDate);
    updateTimerDisplay(timeRemaining);
  }

  updateTimer();

  setInterval(updateTimer, 1000);
}

