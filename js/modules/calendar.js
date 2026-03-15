import { $ } from '../utils/dom.js';

const CALENDAR_FALLBACK_DELAY = 3000;

export function initCalendarLoader() {
  const calendarIframe = $('#calendar-iframe');
  const calendarLoading = $('#calendar-loading');

  if (!calendarIframe || !calendarLoading) {
    return;
  }

  let hasLoaded = false;

  const hideLoader = () => {
    if (hasLoaded) {
      return;
    }

    hasLoaded = true;
    calendarLoading.classList.add('hidden');
  };

  calendarIframe.addEventListener('load', hideLoader, { once: true });
  window.setTimeout(hideLoader, CALENDAR_FALLBACK_DELAY);
}
