import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  showSuccessAndRedirect,
  showError,
  resetFormState,
  hashSHA256,
  ERROR_RESET_DELAY_MS,
  SUCCESS_REDIRECT_DELAY_MS,
} from './loginHandler';
import { ACCESS_STORAGE_KEY, ACCESS_LEVELS } from '@lib/authConstants';

function createLoginElements() {
  const submitButton = document.createElement('button');
  submitButton.id = 'submit';
  
  const passwordInput = document.createElement('input');
  passwordInput.id = 'password';
  passwordInput.type = 'password';
  
  return { submitButton, passwordInput };
}

describe('hashSHA256', () => {
  it('should return consistent hash for same input', async () => {
    const hash1 = await hashSHA256('test');
    const hash2 = await hashSHA256('test');
    
    expect(hash1).toBe(hash2);
  });

  it('should return different hash for different input', async () => {
    const hash1 = await hashSHA256('test1');
    const hash2 = await hashSHA256('test2');
    
    expect(hash1).not.toBe(hash2);
  });
});

describe('showError', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should set error state on button and input', () => {
    const { submitButton, passwordInput } = createLoginElements();
    
    showError(submitButton, passwordInput);
    
    expect(passwordInput.dataset.error).toBe('true');
    expect(submitButton.dataset.error).toBe('true');
  });

  it('should clear error state after timeout', () => {
    const { submitButton, passwordInput } = createLoginElements();

    const wrongPassword = 'wrong-password';
    passwordInput.value = wrongPassword;
    
    showError(submitButton, passwordInput);
    
    vi.advanceTimersByTime(ERROR_RESET_DELAY_MS);
    
    expect(submitButton.dataset.error).toBe('');
    expect(passwordInput.value).toBe(wrongPassword);
  });
});

describe('resetFormState', () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};
    
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => localStorageMock[key] ?? null,
      setItem: (key: string, value: string) => { localStorageMock[key] = value; },
      removeItem: (key: string) => { delete localStorageMock[key]; },
      clear: () => { localStorageMock = {}; },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should clear all data attributes', () => {
    const { submitButton, passwordInput } = createLoginElements();

    submitButton.dataset.success = 'true';
    submitButton.dataset.error = 'true';
    passwordInput.dataset.success = 'true';
    passwordInput.dataset.error = 'true';
    
    resetFormState(submitButton, passwordInput);
    
    expect(submitButton.dataset.success).toBe('');
    expect(submitButton.dataset.error).toBe('');
    expect(passwordInput.dataset.success).toBe('');
    expect(passwordInput.dataset.error).toBe('');
  });

  it('should remove accessGranted from localStorage', () => {
    const { submitButton, passwordInput } = createLoginElements();
    localStorageMock[ACCESS_STORAGE_KEY] = ACCESS_LEVELS.FULL;
    
    resetFormState(submitButton, passwordInput);
    
    expect(localStorageMock[ACCESS_STORAGE_KEY]).toBeUndefined();
  });
});

describe('showSuccessAndRedirect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should set success state on button and input', () => {
    const { submitButton, passwordInput } = createLoginElements();
    
    showSuccessAndRedirect(submitButton, passwordInput);
    
    expect(submitButton.dataset.success).toBe('true');
    expect(passwordInput.dataset.success).toBe('true');
  });

  it('should clear error state on input', () => {
    const { submitButton, passwordInput } = createLoginElements();
    passwordInput.dataset.error = 'true';
    
    showSuccessAndRedirect(submitButton, passwordInput);
    
    expect(passwordInput.dataset.error).toBe('');
  });

  it('should activate cloud overlay if exists', () => {
    const { submitButton, passwordInput } = createLoginElements();
    const overlay = document.createElement('div');
    overlay.id = 'cloud-overlay';
    document.body.appendChild(overlay);
    
    showSuccessAndRedirect(submitButton, passwordInput);
    vi.advanceTimersByTime(SUCCESS_REDIRECT_DELAY_MS);
    
    expect(overlay.dataset.active).toBe('true');
  });
});
