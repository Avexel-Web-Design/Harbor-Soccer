import { $$ } from '../utils/dom.js';
import { createModalController } from './modal-controller.js';

const PROGRAM_STATUS = {
  recreational: {
    isOpen: true,
    label: 'Recreational Soccer',
    actionLabel: 'Register for Rec Soccer',
    closedLabel: 'Registration Closed',
    url: 'https://system.gotsport.com/programs/404E95977?reg_role=player',
    buttonClass: 'rec-button',
  },
  travel: {
    isOpen: true,
    label: 'Travel Soccer',
    actionLabel: 'Register for Travel Soccer',
    closedLabel: 'Registration Closed',
    url: 'https://system.gotsport.com/programs/7Q6587827?reg_role=player',
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
    title: 'Fall 2026 Registration Open Now',
    description:
      'Registration is now open for the Fall 2026 season! Join our community of young athletes and experience the joy of soccer in a supportive environment.',
    buttonLabel: 'Register Now',
  },
  recOnlyOpen: {
    title: 'Fall 2026 Rec Registration Open',
    description:
      'Rec registration is open now. Regular registration closes September 1, with late registration available September 1-8 at midnight.',
    buttonLabel: 'View Available Programs',
  },
  travelOnlyOpen: {
    title: 'Fall Travel Soccer Registration Open',
    description:
      'Fall travel soccer registration is open now. Regular deadline is July 22; a late fee applies from July 23 through August 1 at midnight. Click below to register.',
    buttonLabel: 'Register Now',
  },
  recAndTravelOpen: {
    title: 'Fall 2026 Registration Open',
    description:
      'Rec and travel soccer registration are open now. Click below to see program details, deadlines, and register.',
    buttonLabel: 'View Available Programs',
  },
  partialOpen: {
    title: 'Fall 2026 Registration Open',
    buttonLabel: 'View Available Programs',
  },
  closed: {
    title: 'Registration Currently Closed',
    description:
      'Registration for the Fall 2026 season is currently closed. Stay tuned for updates on when registration will reopen for future seasons.',
    buttonLabel: 'View Program Details',
  },
};

function getRegistrationCopy(openPrograms, totalPrograms) {
  if (openPrograms === 0) {
    return REGISTRATION_COPY.closed;
  }

  if (openPrograms === totalPrograms) {
    return REGISTRATION_COPY.allOpen;
  }

  if (
    openPrograms === 2 &&
    PROGRAM_STATUS.recreational.isOpen &&
    PROGRAM_STATUS.travel.isOpen
  ) {
    return REGISTRATION_COPY.recAndTravelOpen;
  }

  if (openPrograms === 1 && PROGRAM_STATUS.recreational.isOpen) {
    return REGISTRATION_COPY.recOnlyOpen;
  }

  if (openPrograms === 1 && PROGRAM_STATUS.travel.isOpen) {
    return REGISTRATION_COPY.travelOnlyOpen;
  }

  return {
    ...REGISTRATION_COPY.partialOpen,
    description: `Registration is currently open for ${openPrograms} of ${totalPrograms} programs. Click below to see which programs are currently accepting registrations.`,
  };
}

export function initRegistration() {
  const registrationSection = document.querySelector('.registration');
  const registrationHero =
    registrationSection?.querySelector('.registration-hero');
  const registerButton = document.getElementById('register-btn');

  if (!registrationSection || !registrationHero || !registerButton) {
    return null;
  }

  const heroTitle = registrationHero.querySelector('h3');
  const heroDescription = registrationHero.querySelector('.registration-intro');
  const programButtons = $$('[data-program-key]');

  const openPrograms = Object.values(PROGRAM_STATUS).filter(
    (program) => program.isOpen,
  ).length;
  const totalPrograms = Object.keys(PROGRAM_STATUS).length;
  const isRegistrationOpen = openPrograms > 0;

  if (heroTitle && heroDescription) {
    const activeCopy = getRegistrationCopy(openPrograms, totalPrograms);

    heroTitle.textContent = activeCopy.title;
    heroDescription.textContent = activeCopy.description;
    registerButton.textContent = activeCopy.buttonLabel;
  }

  registrationSection.classList.toggle('registration-open', isRegistrationOpen);
  registrationSection.classList.toggle(
    'registration-closed',
    !isRegistrationOpen,
  );
  registerButton.classList.toggle('registration-open-btn', isRegistrationOpen);
  registerButton.classList.toggle(
    'registration-closed-btn',
    !isRegistrationOpen,
  );

  programButtons.forEach((button) => {
    const programKey = button.dataset.programKey;
    const program = programKey ? PROGRAM_STATUS[programKey] : null;

    if (!program) {
      return;
    }

    const programOption = button.closest('.program-option');
    const statusBadge = programOption?.querySelector('.program-status');

    button.textContent = program.isOpen
      ? program.actionLabel
      : program.closedLabel;
    button.classList.toggle('open-state', program.isOpen);
    button.classList.toggle('closed-state', !program.isOpen);
    button.classList.toggle('is-disabled', !program.isOpen);
    button.setAttribute('aria-disabled', String(!program.isOpen));

    programOption?.classList.toggle('program-option--open', program.isOpen);
    programOption?.classList.toggle('program-option--closed', !program.isOpen);

    if (statusBadge) {
      statusBadge.textContent = program.isOpen ? 'Open' : 'Closed';
      statusBadge.classList.toggle('program-status--open', program.isOpen);
      statusBadge.classList.toggle('program-status--closed', !program.isOpen);
    }

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
