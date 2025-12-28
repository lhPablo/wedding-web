interface FormHandlerConfig {
  googleScriptUrl: string;
  successMessage: string;
  errorMessage: string;
  submitText: string;
}

export const RATE_LIMIT_KEY = 'form_submissions';
export const RATE_LIMIT_MAX = 6;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
export const FORM_RESET_DELAY_MS = 2000;
export const MESSAGE_HIDE_DELAY_MS = 8000;

export const initFormHandler = (config: FormHandlerConfig) => {
  const form = document.querySelector('[data-form]') as HTMLFormElement;
  const submitBtn = document.querySelector('[data-submit-btn]') as HTMLButtonElement;
  const messageDiv = document.querySelector('[data-message]') as HTMLDivElement;

  if (!form || !submitBtn || !messageDiv) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleSubmit(form, submitBtn, messageDiv, config);
  });
};

async function handleSubmit(
  form: HTMLFormElement,
  submitBtn: HTMLButtonElement,
  messageDiv: HTMLDivElement,
  config: FormHandlerConfig
) {
  setButtonLoading(submitBtn, config.submitText, true);
  hideMessage(messageDiv);

  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Honeypot check
    if (data.website && data.website.trim() !== '') {
      // Simulate success to avoid alerting the bot
      showButtonSuccess(submitBtn);
      showMessage(messageDiv, config.successMessage, 'success');
      setTimeout(() => {
        form.reset();
        resetButtonState(submitBtn, config.submitText);
      }, FORM_RESET_DELAY_MS);
      return;
    }

    if (isRateLimited()) {
      throw new Error('Has enviado demasiadas solicitudes. Por favor, inténtalo más tarde.');
    }

    const validationError = validateFormData(data);
    if (validationError) {
      throw new Error(validationError);
    }

    if (!config.googleScriptUrl) {
      throw new Error('URL de Google Script no configurada');
    }

    // Delete honeypot field before sending
    delete data.website;

    await sendFormData(config.googleScriptUrl, data);

    // Record successful submission for rate limiting
    recordSubmission();

    showButtonSuccess(submitBtn);
    setFormFieldsState(form, 'success');
    showMessage(messageDiv, config.successMessage, 'success');

    setTimeout(() => {
      form.reset();
      resetButtonState(submitBtn, config.submitText);
      resetFormFieldsState(form);
    }, FORM_RESET_DELAY_MS);
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    const errorMessage = error instanceof Error ? error.message : config.errorMessage;

    showButtonError(submitBtn);
    setFormFieldsState(form, 'error');
    showMessage(messageDiv, errorMessage, 'error');

    setTimeout(() => {
      resetButtonState(submitBtn, config.submitText);
      resetFormFieldsState(form);
    }, FORM_RESET_DELAY_MS);
  }
}

export function validateFormData(data: Record<string, string>): string | null {
  if (!data.name || data.name.trim() === '') {
    return 'El nombre es obligatorio';
  }

  if (!data.age) {
    return 'Por favor, indica tu rango de edad';
  }

  if (!data.menu_type) {
    return 'Por favor, indica el tipo de menú';
  }

  if (!data.phone || data.phone.trim() === '') {
    return 'El teléfono es obligatorio';
  }

  if (!data.bus) {
    return 'Por favor, indica si necesitas autobús';
  }

  if (data.comments && data.comments.length > 5000) {
    return 'Los comentarios son demasiado largos (máximo 5000 caracteres)';
  }

  const companionError = validateCompanions(data);
  if (companionError) {
    return companionError;
  }

  return null;
}

export function validateCompanions(data: Record<string, string>): string | null {
  const numCompanions = parseInt(data.companions || '0') || 0;

  for (let i = 1; i <= numCompanions; i++) {
    if (!data[`companion_${i}_name`] || data[`companion_${i}_name`].trim() === '') {
      return `Por favor, indica el nombre del acompañante ${i}`;
    }
    if (!data[`companion_${i}_relation`]) {
      return `Por favor, indica la relación del acompañante ${i}`;
    }
    if (!data[`companion_${i}_age`]) {
      return `Por favor, indica el rango de edad del acompañante ${i}`;
    }
    if (!data[`companion_${i}_menu_type`]) {
      return `Por favor, indica el tipo de menú del acompañante ${i}`;
    }
  }

  return null;
}

async function sendFormData(url: string, data: Record<string, string>) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response;
}

function setButtonLoading(btn: HTMLButtonElement, originalText: string, isLoading: boolean) {
  btn.disabled = isLoading;

  const textSpan = btn.querySelector('span:first-child');
  if (textSpan) {
    textSpan.textContent = isLoading ? 'Enviando...' : originalText;
  }
}

function showButtonSuccess(btn: HTMLButtonElement) {
  btn.disabled = true;
  btn.dataset.success = 'true';
  btn.dataset.error = '';
}

function showButtonError(btn: HTMLButtonElement) {
  btn.disabled = true;
  btn.dataset.error = 'true';
  btn.dataset.success = '';
}

function resetButtonState(btn: HTMLButtonElement, originalText: string) {
  btn.disabled = false;
  btn.dataset.success = '';
  btn.dataset.error = '';

  const textSpan = btn.querySelector('span:first-child');
  if (textSpan) {
    textSpan.textContent = originalText;
  }
}

function showMessage(element: HTMLDivElement, message: string, type: 'success' | 'error') {
  element.textContent = message;
  element.className = `${element.className.split(' ')[0]} ${type}`;
  element.hidden = false;

  setTimeout(() => {
    hideMessage(element);
  }, MESSAGE_HIDE_DELAY_MS);
}

function hideMessage(element: HTMLDivElement) {
  element.hidden = true;
}

function setFormFieldsState(form: HTMLFormElement, state: 'success' | 'error') {
  const fields = form.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    const el = field as HTMLElement;
    if (state === 'success') {
      el.dataset.success = 'true';
      el.dataset.error = '';
    } else {
      el.dataset.error = 'true';
      el.dataset.success = '';
    }
  });
}

function resetFormFieldsState(form: HTMLFormElement) {
  const fields = form.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    const el = field as HTMLElement;
    el.dataset.success = '';
    el.dataset.error = '';
  });
}

export function getSubmissions(): number[] {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);    
    if (!stored) return [];

    return JSON.parse(stored) as number[];
  } catch {
    return [];
  }
}

export function isRateLimited(): boolean {
  const now = Date.now();
  const submissions = getSubmissions();
  
  const recentSubmissions = submissions.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  
  return recentSubmissions.length >= RATE_LIMIT_MAX;
}

export function recordSubmission(): void {
  const now = Date.now();
  const submissions = getSubmissions();
  
  const recentSubmissions = submissions.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recentSubmissions.push(now);
  
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
  } catch {}
}
