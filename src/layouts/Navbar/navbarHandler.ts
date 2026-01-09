const sectionVisibility = new Map<string, number>();

const getMostVisibleSection = (): string | null => {
  let maxVisibility = 0;
  let activeId: string | null = null;

  for (const [id, ratio] of sectionVisibility) {
    if (ratio > maxVisibility) {
      maxVisibility = ratio;
      activeId = id;
    }
  }

  return maxVisibility > 0 ? activeId : null;
};

const updateActiveSection = () => {
  const activeId = getMostVisibleSection();

  document.querySelectorAll('#navbar a[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    const id = href?.substring(1);
    link.setAttribute('data-active', id === activeId ? 'true' : 'false');
  });

  if (activeId) {
    const currentHash = window.location.hash.substring(1);
    if (currentHash !== activeId) {
      history.replaceState(null, '', `#${activeId}`);
    }
  }
};

const addSelectedLinkListener = (sections: NodeListOf<HTMLElement>) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        sectionVisibility.set(entry.target.id, entry.intersectionRatio);
      });
      updateActiveSection();
    },
    { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
  );

  sections.forEach((section: HTMLElement) => observer.observe(section));
};

const addNavbarVisibilityListener = (navbar: HTMLElement) => {
  const heroSection = document.querySelector('section');
  
  if (!heroSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navbar.setAttribute('data-visible', 'false');
        } else {
          navbar.setAttribute('data-visible', 'true');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px'
    }
  );

  observer.observe(heroSection);
};

const initSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        history.replaceState(null, '', href);
      }
    });
  });
};

export const initNavbar = () => {
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  initSmoothScroll();

  const sections = document.querySelectorAll('section');

  addSelectedLinkListener(sections);

  addNavbarVisibilityListener(navbar);
};
