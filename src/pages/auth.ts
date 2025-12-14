export function initAuth() {
  const correctHash = import.meta.env.PUBLIC_ACCESS_KEY_HASH;
  const correctLimitKey = import.meta.env.PUBLIC_LIMIT_ACCESS_KEY_HASH;

  const form = document.getElementById('login-form') as HTMLFormElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const errorMessage = document.getElementById('error-message') as HTMLElement;

  if (!form || !passwordInput || !errorMessage) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = passwordInput.value.trim();
    const inputHash = await hashSHA256(input);

    if (inputHash === correctHash) {
      localStorage.setItem('accessGranted', 'full');
      goToHome(errorMessage);
    } else if (inputHash === correctLimitKey) {
      localStorage.setItem('accessGranted', 'limited');
      goToHome(errorMessage);
    } else {
      errorMessage.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();

      passwordInput.style.animation = 'shake 0.5s';
      setTimeout(() => {
        passwordInput.style.animation = '';
      }, 500);
    }
  });
}

function goToHome(errorMessage: HTMLElement) {
  errorMessage.style.display = 'none';
  window.location.href = '/main';
}

async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
