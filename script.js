// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Hide calendar loading indicator once the iframe loads
  const calendarIframe = document.getElementById('calendar-iframe');
  const calendarLoading = document.getElementById('calendar-loading');

  if (calendarIframe && calendarLoading) {
    calendarIframe.onload = function() {
      calendarLoading.classList.add('hidden');
    };

    // Fallback: hide loading after 3 seconds
    setTimeout(() => {
      calendarLoading.classList.add('hidden');
    }, 3000);
  }
});

// Touch variables for swipe gestures (declare once at top level)
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle with enhanced animations
const mobileToggle = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-menu-overlay");
const mobileClose = document.getElementById("mobile-close");
const body = document.body;

mobileToggle.addEventListener("click", function () {
  const isActive = mobileToggle.classList.contains("active");

  mobileToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");

  // Update accessibility attributes
  mobileToggle.setAttribute("aria-expanded", !isActive);

  // Prevent body scroll when menu is open
  if (!isActive) {
    body.style.overflow = "hidden";
    body.style.paddingRight = getScrollbarWidth() + "px"; // Prevent layout shift
  } else {
    body.style.overflow = "";
    body.style.paddingRight = "";
  }
});

// Get scrollbar width to prevent layout shift
function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    closeMobileMenu();
  });
});

// Close menu when clicking mobile close button
mobileClose.addEventListener("click", function () {
  closeMobileMenu();
});

// Close menu when clicking on overlay
mobileOverlay.addEventListener("click", function () {
  closeMobileMenu();
});

// Helper function to close mobile menu
function closeMobileMenu() {
  mobileToggle.classList.remove("active");
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
  mobileToggle.setAttribute("aria-expanded", "false");
  body.style.overflow = "";
  body.style.paddingRight = "";
}

// Enhanced mobile menu with swipe gestures and visual feedback
let isSwipeActive = false;

mobileMenu.addEventListener(
  "touchmove",
  function (e) {
    if (!isSwipeActive) return;

    const currentX = e.changedTouches[0].screenX;
    const deltaX = touchStartX - currentX;

    // Only apply transform if swiping left (deltaX > 0)
    if (deltaX > 0 && deltaX < 300) {
      const progress = Math.min(deltaX / 300, 1);
      mobileMenu.style.transform = `translateX(${deltaX}px)`;
      mobileMenu.style.opacity = 1 - progress * 0.3;
    }
  },
  { passive: true }
);

mobileMenu.addEventListener(
  "touchstart",
  function (e) {
    isSwipeActive = true;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  },
  { passive: true }
);

mobileMenu.addEventListener(
  "touchend",
  function (e) {
    if (!isSwipeActive) return;

    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    // Reset styles
    mobileMenu.style.transform = "";
    mobileMenu.style.opacity = "";

    handleSwipe();
    isSwipeActive = false;
  },
  { passive: true }
);

function handleSwipe() {
  const swipeDistanceX = touchStartX - touchEndX;
  const swipeDistanceY = Math.abs(touchStartY - touchEndY);

  // If horizontal swipe is more than 50px and vertical swipe is less than 100px
  if (swipeDistanceX > 50 && swipeDistanceY < 100) {
    // Swipe left to close menu
    closeMobileMenu();
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Show message function
function showMessage(message, type = "info") {
  // Remove any existing messages
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageEl = document.createElement("div");
  messageEl.className = `message message-${type}`;
  messageEl.textContent = message;
  // Style the message
  messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : "#FF8C00"};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  // Add to page
  document.body.appendChild(messageEl);

  // Animate in
  setTimeout(() => {
    messageEl.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    messageEl.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 300);
  }, 5000);
}

// Add active states to navigation based on scroll position
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Enhanced button hover effects
document
  .querySelectorAll(".cta-button, .register-button, .submit-button")
  .forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  // Add ripple styles
  circle.style.cssText += `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
        pointer-events: none;
    `;

  const ripple = button.querySelector(".ripple");
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Add ripple effect CSS animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button, .register-button, .submit-button {
        position: relative;
        overflow: hidden;
    }
      .nav-link.active {
        color: #FF8C00 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Add ripple to buttons
document
  .querySelectorAll(".cta-button, .register-button, .submit-button")
  .forEach((button) => {
    button.addEventListener("click", createRipple);
  });

// Intersection Observer for counting animations (if you want to add counters later)
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe elements that need animation
document
  .querySelectorAll(".program-card, .value-item, .testimonial")
  .forEach((el) => {
    observer.observe(el);
  });

// Add keyboard navigation for accessibility
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Close mobile menu if open
    if (mobileMenu.classList.contains("active")) {
      closeMobileMenu();
      mobileToggle.focus(); // Return focus to mobile toggle button
    }
  }

  // Trap focus within mobile menu when open
  if (mobileMenu.classList.contains("active")) {
    const focusableElements = mobileMenu.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }
});

// Form validation enhancements
const formInputs = document.querySelectorAll("input, select, textarea");
formInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    validateField(this);
  });

  input.addEventListener("input", function () {
    clearFieldError(this);
  });
});



// Lazy loading for images (if you add images later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

/*
================================================================================
HARBOR SOCCER - REGISTRATION MANAGEMENT SYSTEM
================================================================================

HOW TO TOGGLE REGISTRATION:

To open/close registration for individual programs, simply change the values below:

PROGRAM_STATUS = {
  recreational: true,   // ← Change to false to close Rec Soccer registration
  travel: true,         // ← Change to false to close Travel Soccer registration  
  sailors: true         // ← Change to false to close Sailors registration
};

EXAMPLES:
- All programs open: Set all to true
- Only Rec open: recreational: true, travel: false, sailors: false
- Only Travel and Sailors: recreational: false, travel: true, sailors: true
- All closed: Set all to false

The page will automatically update to reflect the changes!

================================================================================
*/

// Registration Configuration - EASY TO TOGGLE!
// Set each program individually to true (open) or false (closed)
const PROGRAM_STATUS = {
  recreational: false,   // Rec Soccer (Birth Years: 2018-2021)
  travel: true,          // Travel Soccer (Birth Years: 2011-2017)
  sailors: false         // Sailors (High School Girls)
};

// Overall registration status (automatically determined from individual programs)
const REGISTRATION_OPEN = Object.values(PROGRAM_STATUS).some(status => status);

// Registration Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("registration-modal");
  const registerBtn = document.getElementById("register-btn");
  const closeBtn = document.querySelector(".close");
  
  // Update registration status based on configuration
  updateRegistrationStatus();

  // Function to update registration status throughout the page
  function updateRegistrationStatus() {
    const registrationSection = document.querySelector('.registration');
    const registrationHero = document.querySelector('.registration-hero');
    const registerBtn = document.getElementById('register-btn');
    const heroTitle = registrationHero.querySelector('h3');
    const heroDescription = registrationHero.querySelector('.registration-intro');
    
    // Count how many programs are open
    const openPrograms = Object.values(PROGRAM_STATUS).filter(status => status).length;
    const totalPrograms = Object.keys(PROGRAM_STATUS).length;
    
    if (REGISTRATION_OPEN) {
      // At least one program is OPEN
      registrationSection.classList.remove('registration-closed');
      registrationSection.classList.add('registration-open');
      
      if (openPrograms === totalPrograms) {
        heroTitle.textContent = 'Fall 2025 Registration Open Now';
        heroDescription.textContent = 'Registration is now open for the Fall 2025 season! Join our community of young athletes and experience the joy of soccer in a supportive environment.';
        registerBtn.textContent = 'Register Now';
      } else if (openPrograms === 1 && PROGRAM_STATUS.travel) {
        // Only Travel Soccer is open
        heroTitle.textContent = '2026 Travel Soccer Registration Now Open';
        heroDescription.textContent = 'Registration is now open for the 2026 Travel Spring Soccer season! Join our competitive travel program and take your soccer skills to the next level.';
        registerBtn.textContent = 'Register Now';
      } else {
        heroTitle.textContent = 'Fall 2025 Registration Open';
        heroDescription.textContent = `Registration is currently open for ${openPrograms} of ${totalPrograms} programs. Click below to see which programs are accepting registrations.`;
        registerBtn.textContent = 'View Available Programs';
      }
      
      registerBtn.classList.remove('registration-closed-btn');
      registerBtn.classList.add('registration-open-btn');
      
    } else {
      // All programs are CLOSED
      registrationSection.classList.remove('registration-open');
      registrationSection.classList.add('registration-closed');
      
      heroTitle.textContent = 'Registration Currently Closed';
      heroDescription.textContent = 'Registration for the Fall 2025 season is currently closed. Stay tuned for updates on when registration will reopen for future seasons.';
      
      registerBtn.textContent = 'View Program Details';
      registerBtn.classList.remove('registration-open-btn');
      registerBtn.classList.add('registration-closed-btn');
    }
    
    // Update individual program buttons
    updateModalButtons();
  }
  
  // Function to update modal program buttons individually
  function updateModalButtons() {
    const recButton = document.querySelector('.rec-button');
    const travelButton = document.querySelector('.travel-button');
    const sailorsButton = document.querySelector('.sailors-button');
    
    // Update Recreational Soccer button
    if (PROGRAM_STATUS.recreational) {
      recButton.textContent = 'Register for Rec Soccer';
      recButton.href = 'https://system.gotsport.com/programs/C26712908';
      recButton.classList.remove('closed-state');
      recButton.classList.add('open-state');
      recButton.onclick = null; // Remove any click prevention
    } else {
      recButton.textContent = 'Registration Closed';
      recButton.href = '#';
      recButton.classList.remove('open-state');
      recButton.classList.add('closed-state');
      recButton.onclick = function(e) { e.preventDefault(); };
    }
    
    // Update Travel Soccer button
    if (PROGRAM_STATUS.travel) {
      travelButton.textContent = 'Register for Travel Soccer';
      travelButton.href = 'https://system.gotsport.com/programs/804B78035?reg_role=player';
      travelButton.classList.remove('closed-state');
      travelButton.classList.add('open-state');
      travelButton.onclick = null; // Remove any click prevention
    } else {
      travelButton.textContent = 'Registration Closed';
      travelButton.href = '#';
      travelButton.classList.remove('open-state');
      travelButton.classList.add('closed-state');
      travelButton.onclick = function(e) { e.preventDefault(); };
    }
    
    // Update Sailors button
    if (PROGRAM_STATUS.sailors) {
      sailorsButton.textContent = 'Register for Sailors';
      sailorsButton.href = 'https://system.gotsport.com/programs/407080D76?reg_role=player';
      sailorsButton.classList.remove('closed-state');
      sailorsButton.classList.add('open-state');
      sailorsButton.onclick = null; // Remove any click prevention
    } else {
      sailorsButton.textContent = 'Registration Closed';
      sailorsButton.href = '#';
      sailorsButton.classList.remove('open-state');
      sailorsButton.classList.add('closed-state');
      sailorsButton.onclick = function(e) { e.preventDefault(); };
    }
  }

  // Open modal when register button is clicked
  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  });

  // Close modal when X is clicked
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // Close modal when clicking outside of it
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Prevent modal from closing when clicking inside modal content
  modal.querySelector(".modal-content").addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  // Handle touch events for better mobile interaction
  let touchStartY = 0;
  let touchEndY = 0;

  modal.addEventListener(
    "touchstart",
    function (e) {
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  modal.addEventListener(
    "touchend",
    function (e) {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;

    // If swipe down is more than 100px, close modal
    if (swipeDistance < -100) {
      closeModal();
    }
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling

    // Return focus to the register button
    registerBtn.focus();
  }

  // Add smooth scroll for mobile when modal is opened
  function preventBackgroundScroll(e) {
    if (modal.style.display === "block") {
      e.preventDefault();
    }
  }

  // Prevent background scrolling on iOS
  modal.addEventListener("touchmove", preventBackgroundScroll, {
    passive: false,
  });

  // Add visual feedback for button taps on mobile
  const programButtons = modal.querySelectorAll(".program-button");
  programButtons.forEach((button) => {
    // Add touch feedback
    button.addEventListener(
      "touchstart",
      function () {
        this.style.transform = "scale(0.98)";
      },
      { passive: true }
    );

    button.addEventListener(
      "touchend",
      function () {
        this.style.transform = "";
      },
      { passive: true }
    );

    // Add accessible click handler
    button.addEventListener("click", function (e) {
      // Add visual feedback before navigation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
});

// Mobile close button functionality
if (mobileClose) {
  mobileClose.addEventListener("click", function () {
    closeMobileMenu();
    mobileToggle.focus(); // Return focus to mobile toggle for accessibility
  });
}

// Keyboard accessibility
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Add keyboard support for mobile toggle button
mobileToggle.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    this.click();
  }
});

// Focus management for mobile menu
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

// Initialize focus trapping when menu is active
const menuObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      if (mobileMenu.classList.contains("active")) {
        trapFocus(mobileMenu);
        mobileClose.focus();
      }
    }
  });
});

menuObserver.observe(mobileMenu, { attributes: true });

// Sponsorship Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const sponsorshipModal = document.getElementById("sponsorship-modal");
  const sponsorshipBtn = document.getElementById("sponsorship-btn");
  
  // Check if elements exist before adding event listeners
  if (!sponsorshipModal || !sponsorshipBtn) {
    console.log("Sponsorship modal elements not found");
    return;
  }
  
  const sponsorshipCloseBtn = sponsorshipModal.querySelector(".close");
  
  if (!sponsorshipCloseBtn) {
    console.log("Sponsorship modal close button not found");
    return;
  }

  // Open sponsorship modal when button is clicked
  sponsorshipBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sponsorshipModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Focus trap for accessibility
    const focusableElements = sponsorshipModal.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  });

  // Close modal when X is clicked
  sponsorshipCloseBtn.addEventListener("click", function (e) {
    console.log("Close button clicked"); // Debug log
    e.preventDefault();
    e.stopPropagation();
    closeSponsorshipModal();
  });

  // Close modal when clicking outside of it
  sponsorshipModal.addEventListener("click", function (e) {
    if (e.target === sponsorshipModal) {
      closeSponsorshipModal();
    }
  });

  // Prevent modal from closing when clicking inside modal content
  sponsorshipModal.querySelector(".modal-content").addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sponsorshipModal.style.display === "block") {
      closeSponsorshipModal();
    }
  });

  // Handle touch events for better mobile interaction
  let touchStartY = 0;
  let touchEndY = 0;

  sponsorshipModal.addEventListener(
    "touchstart",
    function (e) {
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  sponsorshipModal.addEventListener(
    "touchend",
    function (e) {
      touchEndY = e.changedTouches[0].screenY;
      handleSponsorshipSwipe();
    },
    { passive: true }
  );

  function handleSponsorshipSwipe() {
    const swipeDistance = touchStartY - touchEndY;

    // If swipe down is more than 100px, close modal
    if (swipeDistance < -100) {
      closeSponsorshipModal();
    }
  }

  function closeSponsorshipModal() {
    sponsorshipModal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling

    // Return focus to the sponsorship button
    sponsorshipBtn.focus();
  }

  // Add smooth scroll for mobile when modal is opened
  function preventSponsorshipBackgroundScroll(e) {
    if (sponsorshipModal.style.display === "block") {
      e.preventDefault();
    }
  }

  // Prevent background scrolling on iOS
  sponsorshipModal.addEventListener("touchmove", preventSponsorshipBackgroundScroll, {
    passive: false,
  });
});

// Add click event listeners to navigation menu links
const navigationLinks = document.querySelectorAll('.menu-link');
navigationLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Close mobile menu when clicking on navigation link
    closeMobileMenu();
  });
});