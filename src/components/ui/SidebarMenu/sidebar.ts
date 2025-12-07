export const initSidebar = () => {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (!hamburger || !sidebar || !overlay) return;

  const sidebarOpenClass = 'sidebarOpen';
  const hamburgerActiveClass = 'hamburgerActive';
  const overlayActiveClass = 'overlayActive';

  const toggleSidebar = () => {
    sidebar.classList.toggle(sidebarOpenClass);
    hamburger.classList.toggle(hamburgerActiveClass);
    overlay.classList.toggle(overlayActiveClass);
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
      const link = document.querySelector(`#sidebar a[href="#${id}"]`);

      if (entry.isIntersecting) {
        link?.classList.add('active');
      } else {
        link?.classList.remove('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((section: HTMLElement) => observer.observe(section));
}