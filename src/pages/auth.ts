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
      localStorage.setItem('accessGranted', 'full');
      showSuccessAndRedirect(submitButton, passwordInput);
    } else if (inputHash === correctLimitKey) {
      localStorage.setItem('accessGranted', 'limited');
      showSuccessAndRedirect(submitButton, passwordInput);
    } else {
      showErrorAndReset(submitButton, passwordInput);
    }
  });
}

function showSuccessAndRedirect(
  submitButton: HTMLButtonElement,
  passwordInput: HTMLInputElement
) {
  passwordInput.dataset.error = '';
  submitButton.dataset.success = 'true';
  passwordInput.dataset.success = 'true';

  setTimeout(() => {
    window.location.href = '/main';
  }, 900);
}

function showErrorAndReset(
  submitButton: HTMLButtonElement,
  passwordInput: HTMLInputElement
) {
  passwordInput.dataset.error = 'true';
  submitButton.dataset.error = 'true';

  setTimeout(() => {
    submitButton.dataset.error = '';
    passwordInput.value = '';
    passwordInput.focus();
  }, 1000);
}

function resetFormState(
  submitButton: HTMLButtonElement,
  passwordInput: HTMLInputElement
) {
  submitButton.dataset.success = '';
  submitButton.dataset.error = '';
  passwordInput.dataset.success = '';
  passwordInput.dataset.error = '';
  passwordInput.value = '';
  
  localStorage.removeItem('accessGranted');
}

async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
