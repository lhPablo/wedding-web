function showHero(
  loader: Element | null,
  section: Element | null
): void {
  loader?.classList.add('loaded');
  section?.classList.remove('loading');
}

export function initHeroLoader(): void {
  const loader = document.querySelector('[data-hero-loader]');
  const section = document.querySelector('[data-hero-section]');
  const mobileImg = document.querySelector(
    '[data-hero-mobile]'
  ) as HTMLImageElement;
  const desktopImg = document.querySelector(
    '[data-hero-desktop]'
  ) as HTMLImageElement;

  const isMobile = window.matchMedia(
    '(max-width: 768px), (orientation: portrait)'
  ).matches;
  const targetImg = isMobile ? mobileImg : desktopImg;

  if (targetImg?.complete) {
    showHero(loader, section);
  } else {
    targetImg?.addEventListener('load', () => showHero(loader, section));
  }
}

