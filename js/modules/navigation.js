import { $, $$, getFocusableElements } from '../utils/dom.js';
import { lockScroll, unlockScroll } from '../utils/scroll-lock.js';

const ACTIVE_CLASS = 'is-active';

export function initNavigation() {
  const navbar = $('#navbar');
  const mobileToggle = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileOverlay = $('#mobile-menu-overlay');
  const mobileClose = $('#mobile-close');
  const mobileLinks = $$('.mobile-nav-link', mobileMenu ?? document);
  const primaryLinks = $$('.menu-link');
  const allNavLinks = [...primaryLinks, ...mobileLinks];

  if (!navbar || !mobileToggle || !mobileMenu || !mobileOverlay || !mobileClose) {
    return;
  }

  let touchStartX = 0;
  let touchStartY = 0;
  let isSwipeActive = false;
  let lastFocusedElement = null;
  let hideMenuTimer = 0;

  const setScrolledState = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
  };

  const setMenuState = (isOpen, { restoreFocus = true, immediate = false } = {}) => {
    window.clearTimeout(hideMenuTimer);
    if (isOpen) {
      mobileMenu.hidden = false;
      mobileOverlay.hidden = false;
    }

    mobileMenu.classList.toggle(ACTIVE_CLASS, isOpen);
    mobileOverlay.classList.toggle(ACTIVE_CLASS, isOpen);
    mobileToggle.classList.toggle(ACTIVE_CLASS, isOpen);
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      lockScroll();
      window.requestAnimationFrame(() => {
        getFocusableElements(mobileMenu)[0]?.focus();
      });
    } else {
      unlockScroll();
      mobileMenu.style.transform = '';
      mobileMenu.style.opacity = '';

      const hide = () => {
        mobileMenu.hidden = true;
        mobileOverlay.hidden = true;
      };

      if (immediate) {
        hide();
      } else {
        hideMenuTimer = window.setTimeout(hide, 320);
      }

      if (restoreFocus) {
        (lastFocusedElement ?? mobileToggle).focus();
      }
    }
  };

  const openMenu = () => {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : mobileToggle;
    setMenuState(true);
  };

  const closeMenu = () => {
    setMenuState(false);
  };

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains(ACTIVE_CLASS);

    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  mobileToggle.addEventListener('click', toggleMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileOverlay.addEventListener('click', closeMenu);

  allNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains(ACTIVE_CLASS)) {
        closeMenu();
      }
    });
  });

  mobileMenu.addEventListener(
    'touchstart',
    (event) => {
      isSwipeActive = true;
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
    },
    { passive: true },
  );

  mobileMenu.addEventListener(
    'touchmove',
    (event) => {
      if (!isSwipeActive) {
        return;
      }

      const currentX = event.changedTouches[0].screenX;
      const deltaX = touchStartX - currentX;

      if (deltaX > 0 && deltaX < 300) {
        const progress = Math.min(deltaX / 300, 1);
        mobileMenu.style.transform = `translateX(${deltaX}px)`;
        mobileMenu.style.opacity = String(1 - progress * 0.3);
      }
    },
    { passive: true },
  );

  mobileMenu.addEventListener(
    'touchend',
    (event) => {
      if (!isSwipeActive) {
        return;
      }

      const touchEndX = event.changedTouches[0].screenX;
      const touchEndY = event.changedTouches[0].screenY;
      const swipeDistanceX = touchStartX - touchEndX;
      const swipeDistanceY = Math.abs(touchStartY - touchEndY);

      mobileMenu.style.transform = '';
      mobileMenu.style.opacity = '';
      isSwipeActive = false;

      if (swipeDistanceX > 50 && swipeDistanceY < 100) {
        closeMenu();
      }
    },
    { passive: true },
  );

  document.addEventListener('keydown', (event) => {
    if (!mobileMenu.classList.contains(ACTIVE_CLASS)) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(mobileMenu);

    if (!focusableElements.length) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  setMenuState(false, { restoreFocus: false, immediate: true });
  setScrolledState();
  window.addEventListener('scroll', setScrolledState, { passive: true });
}
