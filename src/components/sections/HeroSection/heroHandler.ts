const MIN_LOADER_TIME = 1700;

function showHero(
  loader: Element | null,
  section: Element | null
): void {
  loader?.classList.add('loaded');
  section?.classList.remove('loading');

  const cloudOverlay = document.getElementById('cloud-overlay');
  if (cloudOverlay) {
    cloudOverlay.dataset.active = 'true';
  }

  setTimeout(() => {
    const animatedElements = document.querySelectorAll('[data-hero-animate]');
    animatedElements.forEach((el) => el.classList.add('animate'));
  }, 500);
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

  const isDesktop = window.matchMedia(
    '(min-width: 768px) and (min-aspect-ratio: 1/1)'
  ).matches;
  const targetImg = isDesktop ? desktopImg : mobileImg;

  const startTime = performance.now();

  const handleImageReady = () => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);

    if (remaining > 0) {
      setTimeout(() => showHero(loader, section), remaining);
    } else {
      showHero(loader, section);
    }
  };

  if (targetImg?.complete) {
    handleImageReady();
  } else {
    targetImg?.addEventListener('load', handleImageReady);
  }
}

