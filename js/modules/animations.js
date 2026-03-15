import { prefersReducedMotion } from '../utils/dom.js';

export function initAos() {
  if (!window.AOS) {
    return;
  }

  window.AOS.init({
    duration: prefersReducedMotion() ? 1 : 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    disable: prefersReducedMotion(),
  });
}
