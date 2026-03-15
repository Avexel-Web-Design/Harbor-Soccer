import { $$ } from '../utils/dom.js';

const ACTIVE_CLASS = 'is-active';

export function initScrollSpy() {
  const sections = $$('main section[id]');
  const navLinks = $$('[data-nav-target]');

  if (!sections.length || !navLinks.length) {
    return;
  }

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.dataset.navTarget === id;
      link.classList.toggle(ACTIVE_CLASS, isMatch);
      link.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) {
        return;
      }

      setActive(visibleEntries[0].target.id);
    },
    {
      rootMargin: '-45% 0px -45% 0px',
      threshold: [0.2, 0.4, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));

  setActive(sections[0].id);
}
