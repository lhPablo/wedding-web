export const initSidebar = () => {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (!hamburger || !sidebar || !overlay) return;

  const toggleSidebar = () => {
    const isOpen = sidebar.getAttribute('data-open') === 'true';
    const newState = String(!isOpen);
    
    sidebar.setAttribute('data-open', newState);
    hamburger.setAttribute('data-active', newState);
    overlay.setAttribute('data-active', newState);
  };

  hamburger.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', toggleSidebar);
  sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', toggleSidebar));

  const sections = document.querySelectorAll('section');
  _addSelectedLinkListener(sections);
};

const _addSelectedLinkListener = (sections: NodeListOf<HTMLElement>) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`#sidebar a[href="#${id}"]`) as HTMLElement;

      if (entry.isIntersecting) {
        link?.setAttribute('data-active', 'true');
      } else {
        link?.setAttribute('data-active', 'false');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((section: HTMLElement) => observer.observe(section));
}