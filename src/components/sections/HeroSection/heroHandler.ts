const MIN_LOADER_TIME = 1000;

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

  const animatedElements = document.querySelectorAll('[data-hero-animate]');
  animatedElements.forEach((el) => el.classList.add('animate'));
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
    '(max-width: 768px), (max-aspect-ratio: 1/1)'
  ).matches;
  const targetImg = isMobile ? mobileImg : desktopImg;

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

