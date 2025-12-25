export const initNavbar = () => {
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  _initSmoothScroll();

  const sections = document.querySelectorAll('section');

  // To add the active class to the selected link
  _addSelectedLinkListener(sections);

  // To show the navbar when the user scrolls down
  _addNavbarVisibilityListener(navbar);
};

const _addSelectedLinkListener = (sections: NodeListOf<HTMLElement>) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`#navbar a[href="#${id}"]`) as HTMLElement;

      if (entry.isIntersecting) {
        link?.setAttribute('data-active', 'true');
        
        const currentHash = window.location.hash.substring(1);
        if (currentHash !== id) {
          history.replaceState(null, '', `#${id}`);
        }
      } else {
        link?.setAttribute('data-active', 'false');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((section: HTMLElement) => observer.observe(section));
}

const _addNavbarVisibilityListener = (navbar: HTMLElement) => {
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
}

const _initSmoothScroll = () => {
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
        
        history.pushState(null, '', href);
      }
    });
  });
}