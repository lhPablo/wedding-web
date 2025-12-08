interface FormHandlerConfig {
  googleScriptUrl: string;
  successMessage: string;
  errorMessage: string;
  submitText: string;
}

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
    const data = Object.fromEntries(formData.entries());

    const validationError = validateFormData(data);
    if (validationError) {
      throw new Error(validationError);
    }

    if (!config.googleScriptUrl) {
      throw new Error('URL de Google Script no configurada');
    }

    await sendFormData(config.googleScriptUrl, data);

    showMessage(messageDiv, config.successMessage, 'success');
    form.reset();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    const errorMessage =
      error instanceof Error ? error.message : config.errorMessage;

    showMessage(messageDiv, errorMessage, 'error');
  } finally {
    setButtonLoading(submitBtn, config.submitText, false);
  }
}

function validateFormData(
  data: Record<string, FormDataEntryValue>
): string | null {
  if (!data.nombre || data.nombre.toString().trim() === '') {
    return 'El nombre es obligatorio';
  }

  if (!data.email || data.email.toString().trim() === '') {
    return 'El email es obligatorio';
  }

  if (!data.asistencia) {
    return 'Por favor, indica si asistirás';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.toString())) {
    return 'Por favor, introduce un email válido';
  }

  if (data.comentarios && data.comentarios.toString().length > 5000) {
    return 'Los comentarios son demasiado largos (máximo 5000 caracteres)';
  }

  return null;
}

async function sendFormData(
  url: string,
  data: Record<string, FormDataEntryValue>
) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

function setButtonLoading(
  btn: HTMLButtonElement,
  originalText: string,
  isLoading: boolean
) {
  btn.disabled = isLoading;
  btn.textContent = isLoading ? 'Enviando...' : originalText;
}

function showMessage(
  element: HTMLDivElement,
  message: string,
  type: 'success' | 'error'
) {
  element.textContent = message;
  element.className = `${element.className.split(' ')[0]} ${type}`;
  element.hidden = false;

  setTimeout(() => {
    hideMessage(element);
  }, 8000);
}

function hideMessage(element: HTMLDivElement) {
  element.hidden = true;
}
