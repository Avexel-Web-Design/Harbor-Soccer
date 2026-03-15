import { initAos } from './modules/animations.js';
import { initCalendarLoader } from './modules/calendar.js';
import { initNavigation } from './modules/navigation.js';
import { initRegistration } from './modules/registration.js';
import { initScrollSpy } from './modules/scroll-spy.js';
import { initSponsorshipModal } from './modules/sponsorship.js';

function init() {
  initAos();
  initNavigation();
  initRegistration();
  initSponsorshipModal();
  initScrollSpy();
  initCalendarLoader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
