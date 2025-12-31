import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initGiftSection, showIcon, CopyButtonIcons } from './giftHandler';

describe('showIcon', () => {
  let copyIcon: HTMLElement;
  let checkIcon: HTMLElement;
  let crossIcon: HTMLElement;
  let button: HTMLElement;

  beforeEach(() => {
    copyIcon = document.createElement('span');
    checkIcon = document.createElement('span');
    crossIcon = document.createElement('span');
    button = document.createElement('button');
  });

  it('should show copy icon and hide others', () => {
    showIcon(CopyButtonIcons.COPY, copyIcon, checkIcon, crossIcon, button);

    expect(copyIcon.getAttribute('data-visible')).toBe('true');
    expect(checkIcon.getAttribute('data-visible')).toBe('false');
    expect(crossIcon.getAttribute('data-visible')).toBe('false');
    expect(button.hasAttribute('data-state')).toBe(false);
  });

  it('should show check icon with success state', () => {
    showIcon(CopyButtonIcons.CHECK, copyIcon, checkIcon, crossIcon, button);

    expect(copyIcon.getAttribute('data-visible')).toBe('false');
    expect(checkIcon.getAttribute('data-visible')).toBe('true');
    expect(crossIcon.getAttribute('data-visible')).toBe('false');
    expect(button.getAttribute('data-state')).toBe('success');
  });

  it('should show cross icon with error state', () => {
    showIcon(CopyButtonIcons.CROSS, copyIcon, checkIcon, crossIcon, button);

    expect(copyIcon.getAttribute('data-visible')).toBe('false');
    expect(checkIcon.getAttribute('data-visible')).toBe('false');
    expect(crossIcon.getAttribute('data-visible')).toBe('true');
    expect(button.getAttribute('data-state')).toBe('error');
  });

  it('should remove previous data-state when switching icons', () => {
    showIcon(CopyButtonIcons.CHECK, copyIcon, checkIcon, crossIcon, button);
    expect(button.getAttribute('data-state')).toBe('success');

    showIcon(CopyButtonIcons.COPY, copyIcon, checkIcon, crossIcon, button);
    expect(button.hasAttribute('data-state')).toBe(false);
  });
});

describe('initGiftSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const createGiftButton = (iban: string) => {
    const button = document.createElement('button');
    button.setAttribute('data-copy-iban', iban);
    button.innerHTML = `
      <span data-icon="copy" data-visible="true"></span>
      <span data-icon="check" data-visible="false"></span>
      <span data-icon="cross" data-visible="false"></span>
    `;
    document.body.appendChild(button);
    return button;
  };

  it('should initialize without errors when no button exists', () => {
    expect(() => initGiftSection()).not.toThrow();
  });

  it('should copy the correct value to clipboard', async () => {
    const iban = 'ES1234567890';
    const button = createGiftButton(iban);
    const copyIcon = button.querySelector('[data-icon="copy"]') as HTMLElement;
    copyIcon.setAttribute('data-visible', 'true');
  
    const clipboardMock = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    vi.stubGlobal('navigator', { clipboard: clipboardMock });
  
    initGiftSection();
    button.click();

    await vi.waitFor(() => {
      expect(clipboardMock.writeText).toHaveBeenCalledWith(iban);
    });
  
    vi.unstubAllGlobals();
  });
  

  it('should not copy when copy icon is not visible', async () => {
    const button = createGiftButton('ES1234567890');
    const copyIcon = button.querySelector('[data-icon="copy"]') as HTMLElement;
    copyIcon.setAttribute('data-visible', 'false');

    const clipboardMock = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    vi.stubGlobal('navigator', { clipboard: clipboardMock });

    initGiftSection();
    button.click();

    await vi.waitFor(() => {
      expect(clipboardMock.writeText).not.toHaveBeenCalled();
    });

    vi.unstubAllGlobals();
  });
});

describe('CopyButtonIcons', () => {
  it('should have correct icon values', () => {
    expect(CopyButtonIcons.COPY).toBe('copy');
    expect(CopyButtonIcons.CHECK).toBe('check');
    expect(CopyButtonIcons.CROSS).toBe('cross');
  });
});
