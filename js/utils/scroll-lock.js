let lockCount = 0;
let previousCompensation = '0px';

const getScrollbarCompensation = () => window.innerWidth - document.documentElement.clientWidth;

export function lockScroll() {
  lockCount += 1;

  if (lockCount > 1) {
    return;
  }

  const compensation = getScrollbarCompensation();
  previousCompensation = `${Math.max(compensation, 0)}px`;
  document.body.style.setProperty('--scrollbar-compensation', previousCompensation);
  document.body.classList.add('is-scroll-locked');

  if (compensation > 0) {
    document.body.classList.add('is-scroll-locked--compensated');
  }
}

export function unlockScroll(force = false) {
  if (force) {
    lockCount = 0;
  } else {
    lockCount = Math.max(lockCount - 1, 0);
  }

  if (lockCount > 0) {
    return;
  }

  document.body.classList.remove('is-scroll-locked');
  document.body.classList.remove('is-scroll-locked--compensated');
  document.body.style.setProperty('--scrollbar-compensation', previousCompensation);
}
