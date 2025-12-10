export const initExpandableCards = () => {
  const cards = document.querySelectorAll('[data-card]');

  cards.forEach((card) => {
    const header = card.querySelector('[data-header]');
    const btn = header?.querySelector('[data-toggle]') as HTMLElement;
    const panel = card.querySelector('[data-panel]') as HTMLElement;

    if (!header || !btn || !panel) return;

    header.addEventListener('click', () => {
      const isOpen = panel.getAttribute('data-open') === 'true';
      const newState = !isOpen;

      panel.setAttribute('data-open', String(newState));
      btn.setAttribute('data-open', String(newState));
      btn.setAttribute('aria-expanded', String(newState));
    });
  });
};

