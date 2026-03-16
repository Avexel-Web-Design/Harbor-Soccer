import { prefersReducedMotion } from '../utils/dom.js';

export function initAos() {
  if (!window.AOS) {
    return;
  }

  window.AOS.init({
    duration: prefersReducedMotion() ? 1 : 600,
    easing: 'ease-out',
    once: true,
    offset: 60,
    disable: prefersReducedMotion(),
  });
}
