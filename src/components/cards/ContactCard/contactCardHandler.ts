/**
 * Fallback for browsers that don't support animation-timeline: view() (Safari/iOS).
 * Uses IntersectionObserver to detect when the card is 70% visible.
 */
export function initAvatarTransition(): void {
  // Skip if browser supports animation-timeline (Chrome/Android)
  if (CSS.supports('animation-timeline: view()')) {
    return;
  }

  const contactCards = document.querySelectorAll('[data-contact-card]');
  if (contactCards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const card = entry.target as HTMLElement;
        const avatars = card.querySelectorAll('[data-avatar-default]');

        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          avatars.forEach((avatar) => {
            (avatar as HTMLElement).dataset.faded = 'true';
          });
        } else {
          avatars.forEach((avatar) => {
            delete (avatar as HTMLElement).dataset.faded;
          });
        }
      });
    },
    {
      threshold: [0, 0.7],
    }
  );

  contactCards.forEach((card) => observer.observe(card));
}
