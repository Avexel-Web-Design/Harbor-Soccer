import { createModalController } from './modal-controller.js';

export function initSponsorshipModal() {
  return createModalController({
    modalSelector: '#sponsorship-modal',
    triggerSelector: '#sponsorship-btn',
    initialFocusSelector: '[data-modal-close]',
  });
}
