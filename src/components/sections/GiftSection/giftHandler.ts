const ICON_RESET_DELAY_MS = 2000;

export const CopyButtonIcons = {
  COPY: 'copy',
  CHECK: 'check',
  CROSS: 'cross',
} as const;

export type CopyButtonIcon = typeof CopyButtonIcons[keyof typeof CopyButtonIcons];

export function initGiftSection(): void {
  const copyButton = document.querySelector(
    '[data-copy-iban]'
  ) as HTMLElement;

  if (!copyButton) return;

  const copyIcon = copyButton.querySelector(
    `[data-icon="${CopyButtonIcons.COPY}"]`
  ) as HTMLElement;

  const checkIcon = copyButton.querySelector(
    `[data-icon="${CopyButtonIcons.CHECK}"]`
  ) as HTMLElement;

  const crossIcon = copyButton.querySelector(
    `[data-icon="${CopyButtonIcons.CROSS}"]`
  ) as HTMLElement;

  if (!copyIcon || !checkIcon || !crossIcon) return;

  copyButton.addEventListener('click', async () => {
    if (copyIcon.getAttribute('data-visible') !== 'true') {
      return;
    }

    const iban = copyButton.dataset.copyIban;
    if (!iban) return;

    const copied = await copyToClipboard(iban);

    if (copied) {
      showIcon(
        CopyButtonIcons.CHECK,
        copyIcon,
        checkIcon,
        crossIcon,
        copyButton
      );
    } else {
      showIcon(
        CopyButtonIcons.CROSS,
        copyIcon,
        checkIcon,
        crossIcon,
        copyButton
      );
    }

    setTimeout(() => {
      showIcon(
        CopyButtonIcons.COPY,
        copyIcon,
        checkIcon,
        crossIcon,
        copyButton
      );
    }, ICON_RESET_DELAY_MS);
  });
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn(
        'Clipboard API falló, intentando alternativa:',
        error
      );
    }
  }

  return fallbackCopyToClipboard(text);
}

async function fallbackCopyToClipboard(
  text: string
): Promise<boolean> {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.className = 'hiddenTextarea';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let success = false;

    const range = document.createRange();
    range.selectNodeContents(textArea);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, textArea.value.length);
      success = true;
    }

    document.body.removeChild(textArea);
    return success;
  } catch (error) {
    console.error(
      'Error al copiar al portapapeles:',
      error
    );
    return false;
  }
}

export function showIcon(
  iconType: CopyButtonIcon,
  copyIcon: HTMLElement,
  checkIcon: HTMLElement,
  crossIcon: HTMLElement,
  button: HTMLElement
): void {
  copyIcon.setAttribute('data-visible', 'false');
  checkIcon.setAttribute('data-visible', 'false');
  crossIcon.setAttribute('data-visible', 'false');

  button.removeAttribute('data-state');

  switch (iconType) {
    case CopyButtonIcons.COPY:
      copyIcon.setAttribute('data-visible', 'true');
      break;

    case CopyButtonIcons.CHECK:
      checkIcon.setAttribute('data-visible', 'true');
      button.setAttribute('data-state', 'success');
      break;

    case CopyButtonIcons.CROSS:
      crossIcon.setAttribute('data-visible', 'true');
      button.setAttribute('data-state', 'error');
      break;
  }
}
