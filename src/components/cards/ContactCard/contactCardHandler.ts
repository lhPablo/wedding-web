/**
    * Fallback for browsers that don't support animation-timeline: view()
    * Uses Intersection Observer to detect when the avatar enters the viewport
 */
export function initAvatarTransition(): void {
  // If the browser supports animation-timeline, do nothing
  if (CSS.supports('animation-timeline: view()')) {
    return;
  }

  const avatarDefaults = document.querySelectorAll('[data-avatar-default]');

  if (avatarDefaults.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.3) {
          entry.target.classList.add('faded');
        } else {
          entry.target.classList.remove('faded');
        }
      });
    },
    {
      threshold: [0, 0.3],
    }
  );

  avatarDefaults.forEach((avatar) => observer.observe(avatar));
}

