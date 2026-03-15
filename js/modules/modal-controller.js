import { $, getFocusableElements } from '../utils/dom.js';
import { lockScroll, unlockScroll } from '../utils/scroll-lock.js';

const ACTIVE_CLASS = 'is-active';

function createFocusTrap(modal) {
  return (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(modal);

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
  };
}

export function createModalController({
  modalSelector,
  triggerSelector,
  closeSelector = '[data-modal-close]',
  initialFocusSelector,
}) {
  const modal = $(modalSelector);
  const trigger = $(triggerSelector);

  if (!modal || !trigger) {
    return null;
  }

  const dialog = modal.querySelector('.modal-content');
  const closeButton = modal.querySelector(closeSelector);
  const focusTrap = createFocusTrap(modal);
  let lastFocusedElement = null;
  let hideTimer = 0;

  if (!dialog) {
    return null;
  }

  const syncHiddenState = (isOpen, { restoreFocus = true, immediate = false } = {}) => {
    window.clearTimeout(hideTimer);

    if (isOpen) {
      modal.hidden = false;
    }

    modal.classList.toggle(ACTIVE_CLASS, isOpen);
    modal.setAttribute('aria-hidden', String(!isOpen));
    trigger.setAttribute('aria-expanded', String(isOpen));

    if (!isOpen) {
      const hide = () => {
        modal.hidden = true;
      };

      if (immediate) {
        hide();
      } else {
        hideTimer = window.setTimeout(hide, 320);
      }

      if (restoreFocus) {
        (lastFocusedElement ?? trigger).focus();
      }
    }
  };

  const getInitialFocusElement = () => {
    if (initialFocusSelector) {
      const explicitTarget = modal.querySelector(initialFocusSelector);

      if (explicitTarget) {
        return explicitTarget;
      }
    }

    return getFocusableElements(modal)[0] ?? closeButton ?? dialog;
  };

  const open = () => {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : trigger;
    syncHiddenState(true);
    lockScroll();
    window.requestAnimationFrame(() => {
      getInitialFocusElement()?.focus();
    });
  };

  const close = () => {
    syncHiddenState(false);
    unlockScroll();
  };

  trigger.addEventListener('click', open);

  closeButton?.addEventListener('click', close);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      close();
    }
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    focusTrap(event);
  });

  let touchStartY = 0;

  modal.addEventListener(
    'touchstart',
    (event) => {
      touchStartY = event.changedTouches[0].screenY;
    },
    { passive: true },
  );

  modal.addEventListener(
    'touchend',
    (event) => {
      const touchEndY = event.changedTouches[0].screenY;
      const swipeDistance = touchStartY - touchEndY;

      if (swipeDistance < -100) {
        close();
      }
    },
    { passive: true },
  );

  syncHiddenState(false, { restoreFocus: false, immediate: true });

  return {
    modal,
    trigger,
    open,
    close,
  };
}
