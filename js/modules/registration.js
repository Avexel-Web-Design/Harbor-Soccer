import { $$ } from '../utils/dom.js';
import { createModalController } from './modal-controller.js';

const PROGRAM_STATUS = {
  recreational: {
    isOpen: true,
    label: 'Recreational Soccer',
    actionLabel: 'Register for Rec Soccer',
    closedLabel: 'Registration Closed',
    url: 'https://system.gotsport.com/programs/55034K959?reg_role=player',
    buttonClass: 'rec-button',
  },
  travel: {
    isOpen: false,
    label: 'Travel Soccer',
    actionLabel: 'Register for Travel Soccer',
    closedLabel: 'Registration Closed',
    url: 'https://system.gotsport.com/programs/804B78035?reg_role=player',
    buttonClass: 'travel-button',
  },
  sailors: {
    isOpen: false,
    label: 'Sailors',
    actionLabel: 'Register for Sailors',
    closedLabel: 'Registration Closed',
    url: 'https://system.gotsport.com/programs/407080D76?reg_role=player',
    buttonClass: 'sailors-button',
  },
};

const REGISTRATION_COPY = {
  allOpen: {
    title: 'Spring 2026 Registration Open Now',
    description:
      'Registration is now open for the Spring 2026 season! Join our community of young athletes and experience the joy of soccer in a supportive environment.',
    buttonLabel: 'Register Now',
  },
  partialOpen: {
    title: 'Spring 2026 Registration Open',
    description:
      'Rec registration is open through April 13. Click below to see which programs are currently accepting registrations.',
    buttonLabel: 'View Available Programs',
  },
  closed: {
    title: 'Registration Currently Closed',
    description:
      'Registration for the Spring 2026 season is currently closed. Stay tuned for updates on when registration will reopen for future seasons.',
    buttonLabel: 'View Program Details',
  },
};

export function initRegistration() {
  const registrationSection = document.querySelector('.registration');
  const registrationHero = registrationSection?.querySelector('.registration-hero');
  const registerButton = document.getElementById('register-btn');

  if (!registrationSection || !registrationHero || !registerButton) {
    return null;
  }

  const heroTitle = registrationHero.querySelector('h3');
  const heroDescription = registrationHero.querySelector('.registration-intro');
  const programButtons = $$('[data-program-key]');

  const openPrograms = Object.values(PROGRAM_STATUS).filter((program) => program.isOpen).length;
  const totalPrograms = Object.keys(PROGRAM_STATUS).length;
  const isRegistrationOpen = openPrograms > 0;

  if (heroTitle && heroDescription) {
    const activeCopy = !isRegistrationOpen
      ? REGISTRATION_COPY.closed
      : openPrograms === totalPrograms
        ? REGISTRATION_COPY.allOpen
        : REGISTRATION_COPY.partialOpen;

    heroTitle.textContent = activeCopy.title;
    heroDescription.textContent = activeCopy.description;
    registerButton.textContent = activeCopy.buttonLabel;
  }

  registrationSection.classList.toggle('registration-open', isRegistrationOpen);
  registrationSection.classList.toggle('registration-closed', !isRegistrationOpen);
  registerButton.classList.toggle('registration-open-btn', isRegistrationOpen);
  registerButton.classList.toggle('registration-closed-btn', !isRegistrationOpen);

  programButtons.forEach((button) => {
    const programKey = button.dataset.programKey;
    const program = programKey ? PROGRAM_STATUS[programKey] : null;

    if (!program) {
      return;
    }

    button.textContent = program.isOpen ? program.actionLabel : program.closedLabel;
    button.classList.toggle('open-state', program.isOpen);
    button.classList.toggle('closed-state', !program.isOpen);
    button.classList.toggle('is-disabled', !program.isOpen);
    button.setAttribute('aria-disabled', String(!program.isOpen));

    button.addEventListener('click', () => {
      if (!program.isOpen) {
        return;
      }

      window.open(program.url, '_blank', 'noopener,noreferrer');
    });
  });

  const controller = createModalController({
    modalSelector: '#registration-modal',
    triggerSelector: '#register-btn',
    initialFocusSelector: '[data-program-key]:not(.is-disabled)',
  });

  if (controller) {
    programButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const programKey = button.dataset.programKey;

        if (!programKey || !PROGRAM_STATUS[programKey]?.isOpen) {
          return;
        }

        controller.close();
      });
    });
  }

  return controller;
}
