import { describe, it, expect, beforeEach } from 'vitest';
import { initExpandableCards } from './expandableCardHandler';

describe('initExpandableCards', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const createCard = (isOpen: boolean = false) => {
    const card = document.createElement('div');
    card.setAttribute('data-card', '');
    card.innerHTML = `
      <div data-header>
        <button data-toggle data-open="${isOpen}" aria-expanded="${isOpen}">Toggle</button>
      </div>
      <div data-panel data-open="${isOpen}">Content</div>
    `;
    document.body.appendChild(card);
    return card;
  };

  it('should initialize without errors when no cards exist', () => {
    expect(() => initExpandableCards()).not.toThrow();
  });

  it('should open closed card when header is clicked', () => {
    const card = createCard(false);
    initExpandableCards();

    const header = card.querySelector('[data-header]') as HTMLElement;
    const panel = card.querySelector('[data-panel]') as HTMLElement;
    const btn = card.querySelector('[data-toggle]') as HTMLElement;

    header.click();

    expect(panel.getAttribute('data-open')).toBe('true');
    expect(btn.getAttribute('data-open')).toBe('true');
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close open card when header is clicked', () => {
    const card = createCard(true);
    initExpandableCards();

    const header = card.querySelector('[data-header]') as HTMLElement;
    const panel = card.querySelector('[data-panel]') as HTMLElement;
    const btn = card.querySelector('[data-toggle]') as HTMLElement;

    header.click();

    expect(panel.getAttribute('data-open')).toBe('false');
    expect(btn.getAttribute('data-open')).toBe('false');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle card state on multiple clicks', () => {
    const card = createCard(false);
    initExpandableCards();

    const header = card.querySelector('[data-header]') as HTMLElement;
    const panel = card.querySelector('[data-panel]') as HTMLElement;

    // First click: open
    header.click();
    expect(panel.getAttribute('data-open')).toBe('true');

    // Second click: close
    header.click();
    expect(panel.getAttribute('data-open')).toBe('false');

    // Third click: open again
    header.click();
    expect(panel.getAttribute('data-open')).toBe('true');
  });

  it('should handle multiple cards independently', () => {
    const card1 = createCard(false);
    const card2 = createCard(false);
    initExpandableCards();

    const header1 = card1.querySelector('[data-header]') as HTMLElement;
    const panel1 = card1.querySelector('[data-panel]') as HTMLElement;
    const panel2 = card2.querySelector('[data-panel]') as HTMLElement;

    header1.click();

    expect(panel1.getAttribute('data-open')).toBe('true');
    expect(panel2.getAttribute('data-open')).toBe('false');
  });
});
