import { ACCESS_STORAGE_KEY, ACCESS_LEVELS } from '@lib/authConstants';

export const ERROR_RESET_DELAY_MS = 1000;
export const SUCCESS_REDIRECT_DELAY_MS = 500;
export const OVERLAY_REDIRECT_DELAY_MS = 1000;

export function initAuth() {
  const correctHash = import.meta.env.PUBLIC_ACCESS_KEY_HASH;
  const correctLimitKey = import.meta.env.PUBLIC_LIMIT_ACCESS_KEY_HASH;

  const form = document.getElementById('login-form') as HTMLFormElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const submitButton = document.getElementById('submit') as HTMLButtonElement;

  if (!form || !passwordInput || !submitButton) return;

  window.addEventListener('pageshow', () => {
    resetFormState(submitButton, passwordInput);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = passwordInput.value.trim();
    const inputHash = await hashSHA256(input);

    if (inputHash === correctHash) {
      localStorage.setItem(ACCESS_STORAGE_KEY, ACCESS_LEVELS.FULL);
      showSuccessAndRedirect(submitButton, passwordInput);
    } else if (inputHash === correctLimitKey) {
      localStorage.setItem(ACCESS_STORAGE_KEY, ACCESS_LEVELS.LIMITED);
      showSuccessAndRedirect(submitButton, passwordInput);
    } else {
      showErrorAndReset(submitButton, passwordInput);
    }
  });
}

export function showSuccessAndRedirect(
  submitButton: HTMLButtonElement,
  passwordInput: HTMLInputElement
) {
  passwordInput.dataset.error = '';
  submitButton.dataset.success = 'true';
  passwordInput.dataset.success = 'true';

  setTimeout(() => {
    const overlay = document.getElementById('cloud-overlay');
    
    if (overlay) {
      overlay.dataset.active = 'true';
      
      setTimeout(() => {
        window.location.href = '/main';
      }, OVERLAY_REDIRECT_DELAY_MS);
    } else {
      window.location.href = '/main';
    }
  }, SUCCESS_REDIRECT_DELAY_MS);
}

export function showErrorAndReset(
  submitButton: HTMLButtonElement,
  passwordInput: HTMLInputElement
) {
  passwordInput.dataset.error = 'true';
  submitButton.dataset.error = 'true';

  setTimeout(() => {
    submitButton.dataset.error = '';
    passwordInput.value = '';
    passwordInput.focus();
  }, ERROR_RESET_DELAY_MS);
}

export function resetFormState(
  submitButton: HTMLButtonElement,
  passwordInput: HTMLInputElement
) {
  submitButton.dataset.success = '';
  submitButton.dataset.error = '';
  passwordInput.dataset.success = '';
  passwordInput.dataset.error = '';
  passwordInput.value = '';
  
  localStorage.removeItem(ACCESS_STORAGE_KEY);
}

export async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
