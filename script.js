// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Check cookie consent for calendar
  checkCookieConsent();
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

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Clear previous errors
  clearFieldError(field);

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required.";
  } else if (field.type === "email" && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = "Please enter a valid email address.";
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(field, message) {
  field.style.borderColor = "#e74c3c";

  const errorEl = document.createElement("div");
  errorEl.className = "field-error";
  errorEl.textContent = message;
  errorEl.style.cssText = `
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        font-family: 'Inter', sans-serif;
    `;

  field.parentNode.appendChild(errorEl);
}

function clearFieldError(field) {
  field.style.borderColor = "#e1e5e9";
  const errorEl = field.parentNode.querySelector(".field-error");
  if (errorEl) {
    errorEl.remove();
  }
}

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
  recreational: true,   // Rec Soccer (Birth Years: 2018-2021)
  travel: false,        // Travel Soccer (Birth Years: 2011-2017)
  sailors: false        // Sailors (High School Girls)
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
      travelButton.href = 'https://system.gotsport.com/programs/517Z58281?reg_role=player';
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

// Console message for developers
console.log(
  "%c🌊 Harbor Soccer Website",
  "color: #000000; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cBuilding character through community soccer",
  "color: #FF8C00; font-style: italic;"
);
console.log(
  "%c⚽ Hero images rotate with each visit using local player photos",
  "color: #666; font-style: italic; font-size: 12px;"
);

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

// Contact form submission handler
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const contactForm = e.target;
  
  // Clear any existing error messages
  document.querySelectorAll('.field-error').forEach(error => error.remove());
  
  // Validate form fields
  let isFormValid = true;
  const formFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
  
  formFields.forEach((field) => {
    field.style.borderColor = "#e1e5e9"; // Reset border color
    
    if (!validateField(field)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    showFormMessage('error', 'Please fix the errors above and try again.');
    return;
  }
  
  const submitButton = contactForm.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  
  // Show loading state
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Create form data
  const formData = new FormData(contactForm);
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success message
      showFormMessage('success', result.message);
      contactForm.reset();
    } else {
      // Show error message
      showFormMessage('error', result.error || 'An error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showFormMessage('error', 'Network error. Please check your connection and try again.');
  } finally {
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

// Contact form initialization
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    contactForm.dataset.listenerAttached = 'true';
  }
});

// Function to show form messages
function showFormMessage(type, message) {
  // Remove any existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const contactForm = document.querySelector('.contact-form');
  
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.innerHTML = `
    <div class="form-message-content">
      <span class="form-message-icon">${type === 'success' ? '✅' : '❌'}</span>
      <span class="form-message-text">${message}</span>
    </div>
  `;
  
  if (type === 'success') {
    // For success messages, replace form content temporarily
    const originalContent = contactForm.innerHTML;
    contactForm.innerHTML = '';
    contactForm.appendChild(messageDiv);
    contactForm.classList.add('form-success-state');
    
    // Restore form after 4 seconds
    setTimeout(() => {
      contactForm.innerHTML = originalContent;
      contactForm.classList.remove('form-success-state');
      // Re-attach event listener after restoring form
      attachFormEventListener();
    }, 4000);
  } else {
    // For error messages, insert at the top of the form
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
  }
  
  // Ensure the form area stays in view
  contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Function to re-attach form event listener
function attachFormEventListener() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm && !contactForm.dataset.listenerAttached) {
    contactForm.addEventListener('submit', handleFormSubmit);
    contactForm.dataset.listenerAttached = 'true';
  }
}
// Team Information System
const teamData = {
  travel: {
    boys: {
      u10: {
        name: "U10 Boys Travel Team",
        badge: "travel",
        description:
          "Competitive travel soccer for boys under 10. Focus on skill development, teamwork, and sportsmanship.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "6:00 PM - 7:30 PM",
          "Game Day": "Sunday",
          "Game Time": "Varies (10:00 AM - 4:00 PM)",
          Season: "April - June",
        },        coach: {
          name: "Coaches Name",
          email: "Coach@email.com",
          phone: "(123)-456-7890",
        },
        additionalInfo:
          "Travel to nearby communities for games. Parent volunteers needed for game day support.",
      },
      u12: {
        name: "U12 Boys Travel Team",
        badge: "travel",
        description:
          "Advanced travel soccer for boys under 12. Emphasis on tactical awareness and competitive play.",
        schedule: {
          "Practice Days": "Monday & Wednesday",
          "Practice Time": "6:30 PM - 8:00 PM",
          "Game Day": "Sunday",
          "Game Time": "Varies (10:00 AM - 4:00 PM)",
          Season: "April - June",
        },        coach: {
          name: "Coaches Name",
          email: "Coach@email.com",
          phone: "(123)-456-7890",
        },
        additionalInfo:
          "Higher level of competition with emphasis on player development and game strategy.",
      },
      u14: {
        name: "U14 Boys Travel Team",
        badge: "travel",
        description:
          "Elite travel soccer for boys under 14. Focus on advanced tactics, fitness, and competitive excellence.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "7:00 PM - 8:30 PM",
          "Game Day": "Sunday",
          "Game Time": "Varies (10:00 AM - 4:00 PM)",
          Season: "April - June",
        },        coach: {
          name: "Coaches Name",
          email: "Coach@email.com",
          phone: "(123)-456-7890",
        },
        additionalInfo:
          "Premier level of travel soccer with potential for tournament play and advanced skill development.",
      },
    },
    girls: {
      u10: {
        name: "U10 Girls Travel Team",
        badge: "travel",
        description:
          "Competitive travel soccer for girls under 10. Building confidence and skills through structured play.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "5:30 PM - 7:00 PM",
          "Game Day": "Saturday",
          "Game Time": "Varies (9:00 AM - 3:00 PM)",
          Season: "April - June",
        },        coach: {
          name: "Coaches Name",
          email: "Coach@email.com",
          phone: "(123)-456-7890",
        },
        additionalInfo:
          "Travel to nearby communities for games. Focus on building confidence and fundamental skills.",
      },
      u12: {
        name: "U12 Girls Travel Team",
        badge: "travel",
        description:
          "Advanced travel soccer for girls under 12. Developing tactical skills and team chemistry.",
        schedule: {
          "Practice Days": "Monday & Wednesday",
          "Practice Time": "6:00 PM - 7:30 PM",
          "Game Day": "Saturday",
          "Game Time": "Varies (9:00 AM - 3:00 PM)",
          Season: "April - June",
        },        coach: {
          name: "Coaches Name",
          email: "Coach@email.com",
          phone: "(123)-456-7890",
        },
        additionalInfo:
          "Competitive play with emphasis on skill development and sportsmanship.",
      },
      u14: {
        name: "U14 Girls Travel Team",
        badge: "travel",
        description:
          "Elite travel soccer for girls under 14. Advanced tactical training and competitive excellence.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "6:30 PM - 8:00 PM",
          "Game Day": "Saturday",
          "Game Time": "Varies (9:00 AM - 3:00 PM)",
          Season: "April - June",
        },        coach: {
          name: "Coaches Name",
          email: "Coach@email.com",
          phone: "(123)-456-7890",
        },
        additionalInfo:
          "Premier level of travel soccer with advanced tactical training and tournament opportunities.",
      },
    },
  },
  rec: {
    red: {
      name: "Red",
      badge: "red",
      description:
        "An energetic team focused on developing fundamental soccer skills while having fun. Perfect for players who want to learn the game in a supportive environment.",
      schedule: {
        "Practice Day": "Wednesday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "9:00 AM - 10:00 AM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "All games are played locally at Harbor Springs Soccer Complex. Focus on fun and skill building.",
    },
    orange: {
      name: "Orange",
      badge: "orange",
      description:
        "A vibrant team that emphasizes teamwork and ball skills. Great for players ready to take their game to the next level.",
      schedule: {
        "Practice Day": "Tuesday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "10:15 AM - 11:15 AM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "Focus on developing passing skills and game awareness in a fun, encouraging environment.",
    },
    yellow: {
      name: "Yellow",
      badge: "yellow",
      description:
        "A dynamic team that combines skill development with competitive spirit. Perfect for players who love the excitement of soccer.",
      schedule: {
        "Practice Day": "Thursday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "11:30 AM - 12:30 PM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "Emphasis on speed, agility, and quick decision-making while maintaining a fun atmosphere.",
    },
    green: {
      name: "Green",
      badge: "green",
      description:
        "A fast-paced team focused on developing speed and agility. Great for players who enjoy an active, energetic style of play.",
      schedule: {
        "Practice Day": "Monday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "12:45 PM - 1:45 PM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "Focus on cardiovascular fitness, speed training, and quick transitions between offense and defense.",
    },
    purple: {
      name: "Purple",
      badge: "purple",
      description:
        "A creative team that emphasizes technical skills and artistic play. Perfect for players who love to express themselves on the field.",
      schedule: {
        "Practice Day": "Wednesday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "2:00 PM - 3:00 PM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "Emphasis on creativity, ball control, and developing individual flair while working as a team.",
    },
    "light-blue": {
      name: "Light Blue",
      badge: "light-blue",
      description:
        "A flowing, coordinated team that focuses on smooth passing and team movement. Great for players who enjoy tactical play.",
      schedule: {
        "Practice Day": "Tuesday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "3:15 PM - 4:15 PM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "Focus on possession-based soccer, team coordination, and understanding field positioning.",
    },
    pink: {
      name: "Pink",
      badge: "pink",
      description:
        "A fierce and determined team that combines strength with finesse. Perfect for players who want to develop confidence and competitive spirit.",
      schedule: {
        "Practice Day": "Thursday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "4:30 PM - 5:30 PM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "Building confidence through positive reinforcement while developing competitive skills and determination.",
    },
    "dark-blue": {
      name: "Dark Blue",
      badge: "dark-blue",
      description:
        "A powerful team focused on strength, endurance, and tactical awareness. Great for players ready for more structured gameplay.",
      schedule: {
        "Practice Day": "Monday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "5:45 PM - 6:45 PM",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },additionalInfo:
        "Focus on tactical understanding, defensive principles, and developing game intelligence.",
    },
  },
  sailors: {
    highschool: {
      name: "Sailors",
      badge: "sailors",
      description:
        "The Sailors travel soccer team was founded in 2019 and holds special meaning to our soccer program. Named after Gerry Chamberlin, who spent many years coaching for Harbor Springs Soccer Inc., this team honors his legacy. For high school girls to play while honoring his memory.",
      schedule: {
        "Practice Days": "Tuesday & Thursday",
        "Practice Time": "6:00 PM - 7:30 PM",
        "Game Day": "Saturday",
        "Game Time": "Varies (10:00 AM - 4:00 PM)",
        Season: "April - June",
      },      coach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      assistantCoach: {
        name: "Coaches Name",
        email: "Coach@email.com",
        phone: "(123)-456-7890",
      },
      additionalInfo:
        "A special team dedicated to honoring the legacy of Gerry Chamberlin, who always said if he could name a team something different, he would name it Sailors. The Black Forest Soccer Fields were dedicated in his name.",
    },
  },
};

// Team selector functionality
document.addEventListener("DOMContentLoaded", function () {
  const programTypeSelect = document.getElementById("program-type");
  const travelSelectors = document.getElementById("travel-selectors");
  const recSelectors = document.getElementById("rec-selectors");
  const genderSelect = document.getElementById("gender");
  const ageGroupSelect = document.getElementById("age-group");
  const teamColorSelect = document.getElementById("team-color");
  const noTeamSelected = document.getElementById("no-team-selected");
  const teamScheduleDisplay = document.getElementById("team-schedule-display");

  // Program type change handler
  programTypeSelect.addEventListener("change", function () {
    const selectedProgram = this.value;

    // Hide all selectors and info display
    travelSelectors.style.display = "none";
    recSelectors.style.display = "none";
    noTeamSelected.style.display = "block";
    teamScheduleDisplay.style.display = "none";

    // Reset all dependent selectors
    genderSelect.value = "";
    ageGroupSelect.value = "";
    teamColorSelect.value = "";    // Show appropriate selectors
    if (selectedProgram === "travel") {
      travelSelectors.style.display = "block";
    } else if (selectedProgram === "rec") {
      recSelectors.style.display = "block";
    } else if (selectedProgram === "sailors") {
      // Sailors program doesn't need additional selectors, show team info directly
      displayTeamInfo("sailors", "highschool");
    }
  });

  // Travel selectors change handlers
  genderSelect.addEventListener("change", checkTravelSelection);
  ageGroupSelect.addEventListener("change", checkTravelSelection);

  function checkTravelSelection() {
    if (genderSelect.value && ageGroupSelect.value) {
      displayTeamInfo("travel", genderSelect.value, ageGroupSelect.value);
    } else {
      noTeamSelected.style.display = "block";
      teamScheduleDisplay.style.display = "none";
    }
  }

  // Rec selector change handler
  teamColorSelect.addEventListener("change", function () {
    if (this.value) {
      displayTeamInfo("rec", this.value);
    } else {
      noTeamSelected.style.display = "block";
      teamScheduleDisplay.style.display = "none";
    }
  });
  function displayTeamInfo(program, ...selectors) {
    let teamInfo;

    if (program === "travel") {
      const [gender, ageGroup] = selectors;
      teamInfo = teamData.travel[gender][ageGroup];
    } else if (program === "rec") {
      const [teamColor] = selectors;
      teamInfo = teamData.rec[teamColor];
    } else if (program === "sailors") {
      const [level] = selectors;
      teamInfo = teamData.sailors[level];
    }

    if (teamInfo) {
      const scheduleHTML = Object.entries(teamInfo.schedule)
        .map(
          ([key, value]) =>
            `<li><span class="label">${key}:</span> <span class="value">${value}</span></li>`
        )
        .join("");

      // Hide the "no team selected" message
      noTeamSelected.style.display = "none";

      teamScheduleDisplay.innerHTML = `
        <div class="schedule-header">
          <h3>${teamInfo.name}</h3>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">${teamInfo.description}</p>
        </div>
        
        <div class="schedule-content">
          <div class="schedule-grid">
            <div class="schedule-section">
              <h4>📅 Schedule Information</h4>
              <ul class="schedule-list">
                ${scheduleHTML}
              </ul>
            </div>
              <div class="coach-contact">
              <h4>👨‍🏫 Coach Contact</h4>
              <div class="coach-info">
                <p><strong>${teamInfo.coach.name}</strong></p>
                <p>📧 <a href="mailto:${teamInfo.coach.email}">${teamInfo.coach.email}</a></p>
                <p>📞 ${teamInfo.coach.phone}</p>
                ${teamInfo.assistantCoach ? `
                  <hr style="margin: 1rem 0; border: none; border-top: 1px solid #eee;">
                  <p><strong>${teamInfo.assistantCoach.name}</strong></p>
                  <p>📧 <a href="mailto:${teamInfo.assistantCoach.email}">${teamInfo.assistantCoach.email}</a></p>
                  <p>📞 ${teamInfo.assistantCoach.phone}</p>
                ` : ''}
                <a href="mailto:${teamInfo.coach.email}?subject=Question about ${teamInfo.name}" class="contact-coach">Contact Coach</a>
              </div>
            </div>
          </div>
        
          <div class="additional-info">
            <h4>ℹ️ Additional Information</h4>
            <p>${teamInfo.additionalInfo}</p>
          </div>
        </div>
      `;

      // Add loading class for smooth animation
      teamScheduleDisplay.classList.add('loading');
      teamScheduleDisplay.style.display = "block";
      
      // Remove loading class after a brief moment for smooth animation
      setTimeout(() => {
        teamScheduleDisplay.classList.remove('loading');
      }, 50);

      // Smooth scroll to the schedules section
      setTimeout(() => {
        document.getElementById("schedules").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }
});

// Sponsorship Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const sponsorshipModal = document.getElementById("sponsorship-modal");
  const sponsorshipBtn = document.getElementById("sponsorship-btn");
  const sponsorshipCloseBtn = sponsorshipModal.querySelector(".close");

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
  sponsorshipCloseBtn.addEventListener("click", function () {
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

// Simple Wave Pattern Background Effect
class WaveAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    this.animationId = null;
    
    // Wave parameters
    this.waveSpeed = 0.02;
    this.waveAmplitude = 40;
    this.waveFrequency = 0.01;
    this.pixelSize = 3;
    this.pixelSpacing = 6;
    
    this.init();
  }
    init() {
    this.setupCanvas();
    this.createParticles();
    this.createMetaballs();
    this.setupEventListeners();
    this.animate();
  }
    setupCanvas() {
    const updateSize = () => {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      
      // Recreate particles and metaballs when canvas resizes
      if (this.particles.length > 0) {
        this.createParticles();
        this.createMetaballs();
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
  }
  
  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }
    createParticles() {
    this.particles = [];
    const { width, height } = this.canvas;
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 5 + 1,
        opacity: Math.random() * 0.9 + 0.1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        life: Math.random() * 100,
        originalSize: 0,
        trail: [], // For particle trails
        energy: Math.random() * 0.5 + 0.5 // Particle energy for varied behavior
      });
      this.particles[i].originalSize = this.particles[i].size;
    }
  }
  
  createMetaballs() {
    this.metaballs = [];
    const { width, height } = this.canvas;
    
    for (let i = 0; i < this.metaballCount; i++) {
      this.metaballs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 60 + 40,
        strength: Math.random() * 0.8 + 0.3,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
    // Enhanced noise function with multiple octaves
  noise(x, y, z = 0) {
    // Multi-octave noise for more complex patterns
    const octave1 = Math.sin(x * 0.01 + z) * Math.cos(y * 0.01);
    const octave2 = Math.sin(x * 0.02 + y * 0.01 + z * 1.5) * 0.5;
    const octave3 = Math.sin(x * 0.005 + y * 0.008 + z * 0.8) * 0.7;
    const octave4 = Math.sin(x * 0.03 + y * 0.03 + z * 2) * 0.3;
    return (octave1 + octave2 + octave3 + octave4) / 2.5;
  }
  
  // Enhanced flow field with wave motion
  getFlowField(x, y) {
    const scale = this.noiseScale;
    const angle = this.noise(x * scale, y * scale, this.time * 0.5) * Math.PI * 6;
    const strength = this.noise(x * scale * 0.5, y * scale * 0.5, this.time * 0.3) * this.flowSpeed;
    
    // Add wave motion
    const waveX = Math.sin(y * this.waveFrequency + this.time) * this.waveAmplitude;
    const waveY = Math.cos(x * this.waveFrequency + this.time * 0.7) * this.waveAmplitude;
    
    return {
      x: Math.cos(angle) * strength + waveX * 0.1,
      y: Math.sin(angle) * strength + waveY * 0.1
    };
  }
    updateParticles() {
    const { width, height } = this.canvas;
    const mouseVelX = this.mouse.x - this.mouse.prevX;
    const mouseVelY = this.mouse.y - this.mouse.prevY;
    
    // Update metaballs
    this.metaballs.forEach(ball => {
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.phase += 0.02;
      
      // Add some organic movement
      ball.vx += Math.sin(ball.phase) * 0.1;
      ball.vy += Math.cos(ball.phase * 0.7) * 0.1;
      
      // Bounce off edges
      if (ball.x <= ball.radius || ball.x >= width - ball.radius) ball.vx *= -0.8;
      if (ball.y <= ball.radius || ball.y >= height - ball.radius) ball.vy *= -0.8;
      
      // Keep in bounds
      ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x));
      ball.y = Math.max(ball.radius, Math.min(height - ball.radius, ball.y));
    });
    
    this.particles.forEach(particle => {
      // Store trail positions
      particle.trail.unshift({x: particle.x, y: particle.y});
      if (particle.trail.length > 5) particle.trail.pop();
      
      // Get flow field influence
      const flow = this.getFlowField(particle.x, particle.y);
      
      // Apply flow field with energy variation
      particle.vx += flow.x * 0.15 * particle.energy;
      particle.vy += flow.y * 0.15 * particle.energy;
      
      // Metaball interaction
      this.metaballs.forEach(ball => {
        const dx = particle.x - ball.x;
        const dy = particle.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ball.radius) {
          const force = (ball.radius - distance) / ball.radius * ball.strength;
          const angle = Math.atan2(dy, dx);
          
          // Create orbital motion around metaballs
          const orbitalAngle = angle + Math.PI * 0.3;
          particle.vx += Math.cos(orbitalAngle) * force * 2;
          particle.vy += Math.sin(orbitalAngle) * force * 2;
          
          // Increase particle energy near metaballs
          particle.energy = Math.min(2, particle.energy + force * 0.5);
        }
      });
      
      // Mouse interaction - enhanced swirl effects
      const dx = particle.x - this.mouse.x;
      const dy = particle.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouseInfluence && distance > 0) {
        const force = (this.mouseInfluence - distance) / this.mouseInfluence;
        const angle = Math.atan2(dy, dx);
        
        // Multi-layered swirl effect
        const perpAngle1 = angle + Math.PI * 0.5;
        const perpAngle2 = angle + Math.PI * 0.3;
        const swirl = force * this.turbulence;
        
        particle.vx += Math.cos(perpAngle1) * swirl * 4;
        particle.vy += Math.sin(perpAngle1) * swirl * 4;
        particle.vx += Math.cos(perpAngle2) * swirl * 2;
        particle.vy += Math.sin(perpAngle2) * swirl * 2;
        
        // Add mouse velocity influence
        particle.vx += mouseVelX * force * 0.3;
        particle.vy += mouseVelY * force * 0.3;
        
        // Dynamic size and opacity changes
        particle.size = particle.originalSize * (1 + force * 3);
        particle.opacity = Math.min(1, particle.opacity + force * 0.7);
        particle.energy = Math.min(2, particle.energy + force);
      } else {
        // Gradual return to original state
        particle.size = particle.originalSize * (1 + particle.energy * 0.3);
        particle.energy *= 0.995;
      }
      
      // Apply viscosity with energy consideration
      const viscosityFactor = this.viscosity + (1 - particle.energy) * 0.01;
      particle.vx *= viscosityFactor;
      particle.vy *= viscosityFactor;
      
      // Enhanced turbulence based on energy
      const turbulenceStrength = 0.05 + particle.energy * 0.1;
      particle.vx += (Math.random() - 0.5) * turbulenceStrength;
      particle.vy += (Math.random() - 0.5) * turbulenceStrength;
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Smooth edge wrapping
      if (particle.x < -50) particle.x = width + 50;
      if (particle.x > width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = height + 50;
      if (particle.y > height + 50) particle.y = -50;
      
      // Update life for color variation
      particle.life += 0.025;
      
      // Enhanced opacity variation
      const lifeCycle = Math.sin(particle.life) * 0.4 + 0.6;
      const energyCycle = Math.sin(particle.energy * Math.PI) * 0.3 + 0.7;
      particle.opacity = Math.max(0.1, lifeCycle * energyCycle * 0.9);
    });
  }
    drawParticles() {
    const { width, height } = this.canvas;
    
    // Enhanced gradient background with depth
    const gradient = this.ctx.createRadialGradient(
      width * 0.3, height * 0.2, 0,
      width * 0.7, height * 0.8, Math.max(width, height)
    );
    gradient.addColorStop(0, 'rgba(15, 15, 15, 1)');
    gradient.addColorStop(0.3, 'rgba(35, 20, 5, 1)');
    gradient.addColorStop(0.6, 'rgba(50, 25, 0, 1)');
    gradient.addColorStop(1, 'rgba(25, 15, 5, 1)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw metaballs as background blobs
    this.ctx.globalCompositeOperation = 'screen';
    this.metaballs.forEach(ball => {
      const gradient = this.ctx.createRadialGradient(
        ball.x, ball.y, 0,
        ball.x, ball.y, ball.radius
      );
      gradient.addColorStop(0, `rgba(255, 100, 0, ${ball.strength * 0.3})`);
      gradient.addColorStop(0.5, `rgba(255, 140, 0, ${ball.strength * 0.15})`);
      gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Draw enhanced connection lines
    this.particles.forEach((particle, i) => {
      // Draw connections to nearby particles with varying thickness
      for (let j = i + 1; j < this.particles.length; j += 3) { // More connections
        const other = this.particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const alpha = (100 - distance) / 100 * 0.4;
          const thickness = (100 - distance) / 100 * 2;
          
          // Create gradient line
          const lineGradient = this.ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          );
          
          const particleColor = particle.color.replace('rgba(', '').replace(')', '').split(',');
          const otherColor = other.color.replace('rgba(', '').replace(')', '').split(',');
          
          lineGradient.addColorStop(0, `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${alpha})`);
          lineGradient.addColorStop(1, `rgba(${otherColor[0]}, ${otherColor[1]}, ${otherColor[2]}, ${alpha})`);
          
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = lineGradient;
          this.ctx.lineWidth = thickness;
          this.ctx.stroke();
        }
      }
    });
    
    // Draw particle trails
    this.particles.forEach(particle => {
      if (particle.trail.length > 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        
        for (let i = 1; i < particle.trail.length; i++) {
          const alpha = (particle.trail.length - i) / particle.trail.length * particle.opacity * 0.3;
          this.ctx.strokeStyle = particle.color.replace(/[\d\.]+\)$/g, `${alpha})`);
          this.ctx.lineWidth = particle.size * 0.3;
          this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          this.ctx.stroke();
          this.ctx.beginPath();
          this.ctx.moveTo(particle.trail[i].x, particle.trail[i].y);
        }
      }
    });
    
    // Draw particles with enhanced glow and energy effects
    this.particles.forEach(particle => {
      this.ctx.save();
      
      // Parse color components
      const baseColor = particle.color.replace('rgba(', '').replace(')', '').split(',');
      const r = parseInt(baseColor[0]);
      const g = parseInt(baseColor[1]);
      const b = parseInt(baseColor[2]);
      
      // Energy-based color shift
      const energyR = Math.min(255, r + particle.energy * 30);
      const energyG = Math.min(255, g + particle.energy * 20);
      const energyB = Math.min(255, b + particle.energy * 10);
      
      // Multiple glow layers for better effect
      for (let layer = 0; layer < 3; layer++) {
        const glowRadius = particle.size * (4 - layer);
        const glowOpacity = particle.opacity * (0.8 - layer * 0.2);
        
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius
        );
        
        gradient.addColorStop(0, `rgba(${energyR}, ${energyG}, ${energyB}, ${glowOpacity})`);
        gradient.addColorStop(0.3, `rgba(${energyR}, ${energyG}, ${energyB}, ${glowOpacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${energyR}, ${energyG}, ${energyB}, 0)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      // Core particle with shimmer effect
      const shimmer = Math.sin(particle.life * 2) * 0.3 + 0.7;
      const coreGradient = this.ctx.createRadialGradient(
        particle.x - particle.size * 0.3, particle.y - particle.size * 0.3, 0,
        particle.x, particle.y, particle.size
      );
      
      coreGradient.addColorStop(0, `rgba(${Math.min(255, energyR + 80)}, ${Math.min(255, energyG + 50)}, ${Math.min(255, energyB + 20)}, ${particle.opacity * shimmer})`);
      coreGradient.addColorStop(0.7, `rgba(${energyR}, ${energyG}, ${energyB}, ${particle.opacity})`);
      coreGradient.addColorStop(1, `rgba(${Math.max(0, energyR - 50)}, ${Math.max(0, energyG - 30)}, ${Math.max(0, energyB - 20)}, ${particle.opacity * 0.8})`);
      
      this.ctx.fillStyle = coreGradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    });
    
    // Add some sparkle effects
    this.particles.forEach(particle => {
      if (particle.energy > 1.5 && Math.random() < 0.1) {
        const sparkleCount = Math.floor(particle.energy * 2);
        for (let i = 0; i < sparkleCount; i++) {
          const angle = (Math.PI * 2 * i) / sparkleCount + particle.life;
          const distance = particle.size * 3;
          const sparkleX = particle.x + Math.cos(angle) * distance;
          const sparkleY = particle.y + Math.sin(angle) * distance;
          
          this.ctx.fillStyle = `rgba(255, 255, 200, ${particle.opacity * 0.8})`;
          this.ctx.beginPath();
          this.ctx.arc(sparkleX, sparkleY, 1, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    });
    
    this.ctx.globalCompositeOperation = 'source-over';
  }
    animate() {
    this.time += 0.016; // ~60fps
    
    // Add subtle pulsing effect to the overall intensity
    const pulse = Math.sin(this.time * 0.5) * 0.1 + 0.9;
    this.ctx.globalAlpha = pulse;
    
    this.updateParticles();
    this.drawParticles();
    
    // Reset global alpha
    this.ctx.globalAlpha = 1;
    
    // Draw mouse interaction indicator
    if (this.mouse.x > 0 && this.mouse.y > 0) {
      this.drawMouseEffect();
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  drawMouseEffect() {
    const pulseRadius = 50 + Math.sin(this.time * 3) * 20;
    const gradient = this.ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 0,
      this.mouse.x, this.mouse.y, pulseRadius
    );
    
    gradient.addColorStop(0, 'rgba(255, 200, 0, 0.3)');
    gradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y, pulseRadius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize fluid simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const fluidSim = new FluidSimulation('dither-canvas');
});

// Add click event listeners to navigation menu links
const navigationLinks = document.querySelectorAll('.menu-link');
navigationLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Close mobile menu when clicking on navigation link
    closeMobileMenu();
  });
});

// Cookie and Calendar Management
function checkCookieConsent() {
  const consent = localStorage.getItem('cookie-consent');
  const calendarIframe = document.getElementById('calendar-iframe');
  const calendarBlocked = document.getElementById('calendar-blocked');
  const calendarLoading = document.getElementById('calendar-loading');
  const cookiePopup = document.getElementById('cookie-consent');

  if (consent === 'accepted') {
    // Load calendar immediately
    loadCalendar();
  } else if (consent === 'declined') {
    // Show blocked message
    showCalendarBlocked();
  } else {
    // Show cookie consent popup immediately and prevent body scroll
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      cookiePopup.classList.add('show');
    }, 1000); // Show after 1 second to let page load
  }
}

function loadCalendar() {
  const calendarIframe = document.getElementById('calendar-iframe');
  const calendarBlocked = document.getElementById('calendar-blocked');
  const calendarLoading = document.getElementById('calendar-loading');

  // Hide blocked message and loading
  calendarBlocked.style.display = 'none';
  
  // Set iframe source and show it
  calendarIframe.src = 'https://calendar.google.com/calendar/embed?src=harborsoccerinc2943%40gmail.com&ctz=America%2FDetroit';
  calendarIframe.style.display = 'block';

  // Hide loading after iframe loads
  calendarIframe.onload = function() {
    calendarLoading.classList.add('hidden');
  };

  // Fallback: hide loading after 3 seconds
  setTimeout(() => {
    calendarLoading.classList.add('hidden');
  }, 3000);
}

function showCalendarBlocked() {
  const calendarIframe = document.getElementById('calendar-iframe');
  const calendarBlocked = document.getElementById('calendar-blocked');
  const calendarLoading = document.getElementById('calendar-loading');

  calendarLoading.classList.add('hidden');
  calendarIframe.style.display = 'none';
  calendarBlocked.style.display = 'block';
}

function acceptCookies() {
  localStorage.setItem('cookie-consent', 'accepted');
  hideCookiePopup();
  loadCalendar();
}

function declineCookies() {
  localStorage.setItem('cookie-consent', 'declined');
  hideCookiePopup();
  showCalendarBlocked();
}

function acceptCalendarCookies() {
  localStorage.setItem('cookie-consent', 'accepted');
  loadCalendar();
}

function hideCookiePopup() {
  const cookiePopup = document.getElementById('cookie-consent');
  cookiePopup.classList.remove('show');
  // Restore body scrolling
  document.body.style.overflow = '';
}

// Prevent closing cookie popup by clicking outside (make it required)
document.addEventListener('DOMContentLoaded', function() {
  const cookiePopup = document.getElementById('cookie-consent');
  const cookieModal = cookiePopup.querySelector('.cookie-consent-modal');
  
  cookiePopup.addEventListener('click', function(e) {
    // Don't close if clicking inside the modal
    if (e.target === cookiePopup) {
      // Optional: add a shake animation to emphasize it's required
      cookieModal.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        cookieModal.style.animation = '';
      }, 500);
    }
  });
  
  // Prevent escape key from closing
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cookiePopup.classList.contains('show')) {
      e.preventDefault();
      // Optional: add shake animation
      cookieModal.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        cookieModal.style.animation = '';
      }, 500);
    }
  });
});

// Initialize cookie check when page loads
document.addEventListener('DOMContentLoaded', function() {
  checkCookieConsent();
});