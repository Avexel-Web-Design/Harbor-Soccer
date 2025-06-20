// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,  });
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
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-menu-overlay");
const mobileClose = document.getElementById("mobile-close");
const body = document.body;

hamburger.addEventListener("click", function () {
  const isActive = hamburger.classList.contains("active");

  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");

  // Update accessibility attributes
  hamburger.setAttribute("aria-expanded", !isActive);

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
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
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
      hamburger.focus(); // Return focus to hamburger button
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

// Registration Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("registration-modal");
  const registerBtn = document.getElementById("register-btn");
  const closeBtn = document.querySelector(".close");

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
    hamburger.focus(); // Return focus to hamburger for accessibility
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

// Add keyboard support for hamburger button
hamburger.addEventListener("keydown", function (e) {
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

// Language Translation System
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = {      en: {
        // Page Title
        'page-title': 'Harbor Soccer, Inc.',
          // Navigation
        'nav-programs': 'Programs',
        'nav-registration': 'Registration',
        'nav-about': 'About',
        'nav-support': 'Support',
        'nav-referee': 'Referee',
        'nav-contact': 'Contact',
        'mobile-menu-title': 'Menu',
        
        // Hero Section
        'hero-title': 'Harbor Soccer',
        'hero-subtitle': 'Promoting soccer and enhancing each child\'s skill development',
        'hero-cta': 'Explore Our Programs',
        
        // Programs Section
        'programs-title': 'Our Programs',
        'rec-soccer-title': 'Recreational Soccer',
        'rec-soccer-ages': 'Birth Years: 2018-2021',
        'rec-soccer-description': 'Rec Soccer is a program for younger children in the spring and fall to introduce the game of soccer to those who are excited, passionate, or maybe just curious about soccer.',
        'rec-soccer-feature-1': 'Registration will be available in July',
        'rec-soccer-feature-2': 'Cleats and Shin Guards Required',
        'rec-soccer-feature-3': 'No Travel',
        
        'travel-soccer-title': 'Travel Soccer',
        'travel-soccer-ages': 'Birth Years: 2011-2017',
        'travel-soccer-description': 'Travel Soccer is a program providing players the opportunity to play soccer competitively in the spring and fall seasons.',
        'travel-soccer-feature-1': 'Practices twice weekly',
        'travel-soccer-feature-2': 'Girls games Saturdays',
        'travel-soccer-feature-3': 'Boys games Sundays',
        'travel-soccer-feature-4': 'Cleats and Shin Guards required',
        'travel-soccer-feature-5': 'Travel within Northern Michigan',
        'travel-soccer-note': 'Learn more about who we play on the <a href="https://northernmichigansoccer.com/our-clubs">Northern Michigan Alliance</a> website.',
        
        'sailors-title': 'Sailors',
        'sailors-ages': 'High School Girls',
        'sailors-description': 'Sailors is a high school girls\' travel soccer team that competes in games and tournaments in the fall.',
        'sailors-contact-title': 'Contact Ms. McShannock for more information',
        
        // Registration Section
        'registration-title': 'Registration',
        'registration-open-title': 'Fall 2025 Registration Open Now',
        'registration-intro': 'Registration is now open for the Fall 2025 season! Join our community of young athletes and experience the joy of soccer in a supportive environment.',
        'register-button': 'Register Now',
        
        // About Section
        'about-title': 'About Harbor Soccer, Inc.',
        'about-mission-title': 'Our Mission',
        'about-mission-text': 'The mission of Harbor Soccer, Inc. is to promote the game of soccer and enhance each child\'s skill development. Harbor Soccer, Inc. will promote fair play in a fun, safe and recreational environment while encouraging the development of camaraderie, encouragement of teamwork, and nurturing the skills of each individual player.',
        'about-governing-text': 'Harbor Soccer, Inc. is the governing board, which serves to organize and oversee soccer teams in the Harbor Springs area.',
        'about-memberships-title': 'We Are Proud Members Of',
        'nmsa-full-name': 'Northern Michigan Soccer Alliance',
        'msysa-full-name': 'Michigan State Youth Soccer Association',
        'about-board-title': 'Meet the Board',
        'board-president': 'President',
        'board-treasurer': 'Treasurer',
        'board-facilities': 'Facilities & Secretary',
        'board-registrar': 'Registrar',
        'board-rec-coordinator': 'Rec Soccer Coordinator',
        'board-member': 'Board Member',
        'testimonials-title': 'What Our Players Say',
        'testimonial-1': '"It\'s fun. I have learned how to juggle. I like playing for Harbor Soccer."',
        'testimonial-1-author': '— Jai (Rec Soccer)',
        'testimonial-2': '"It is really fun. You get to play games and all positions. Sometimes you get to play goalie. It feels good to score!"',
        'testimonial-2-author': '— Henry (Travel Soccer)',
        'testimonial-3': '"It is really fun. A great way to get your exercise. It is a really good sport to play!"',
        'testimonial-3-author': '— Whitely (Travel Soccer)',
        
        // Support Section
        'support-title': 'Support Harbor Soccer',
        'support-intro-1': 'Harbor Soccer supports hundreds of children each season in our community. The cost of maintaining the fields, soccer equipment, septic, and referees, are our biggest expenses.',
        'support-intro-2': 'We would love your support! Every donation helps us continue providing quality soccer programs to young athletes in the Harbor Springs area.',
        'support-intro-3': 'We are a 501(c)3 and our EIN is 38-2887596',
        'current-sponsors-title': 'Current Sponsors',
        'current-sponsors-text': 'Thank you to our generous sponsors who make Harbor Soccer possible!',
        'donation-title': 'Make a Donation',
        'donation-text': 'You may mail a check to:',
        'sponsorship-title': 'Become a Sponsor',
        'sponsorship-text': 'Learn about our sponsorship opportunities and how your business can support youth soccer in our community.',
        'sponsorship-coordinator': 'Sponsorship Coordinator',
        'sponsorship-contact-note': 'Reach out to discuss sponsorship packages and opportunities',
        
        // Referee Section
        'referee-title': 'Become a Referee',
        'referee-intro-1': 'There is currently a shortage of referees in youth soccer across Michigan, and Harbor Soccer is feeling this impact. We need dedicated individuals who are passionate about the game and want to give back to the community by officiating our matches.',
        'referee-intro-2': 'Refereeing is a great way to stay involved in soccer, earn some extra income, and help ensure that our young athletes have quality officiating for their games.',
        'referee-action-title': 'Get Started Today',
        'referee-action-text': 'Visit the Michigan State Referee Association to learn more about certification requirements and begin your journey as a youth soccer referee.',
        'referee-button': 'Visit Michigan Refs →',
        'referee-contact-note': 'Questions about becoming a referee? Contact us at <a href="mailto:harborsoccer1@gmail.com">harborsoccer1@gmail.com</a>',
        
        // Contact Section
        'contact-title': 'Contact Us',
        'contact-location': 'Location',
        'contact-mailing': 'Mailing Address',
        'contact-email': 'Email',
        
        // Modal Content
        'modal-rec-soccer-title': 'Recreational Soccer',
        'modal-travel-soccer-title': 'Travel Soccer',
        'modal-sailors-title': 'Sailors',
        'modal-ages': 'Ages:',
        'modal-costs': 'Costs:',
        'modal-registration': 'Registration:',
        'modal-registration-deadline': 'Registration Deadline:',
        'modal-rec-soccer-ages': 'Birth Years: 2018-2021',
        'modal-travel-soccer-ages': 'Birth Years: 2011-2017',
        'modal-sailors-ages': 'High School Girls',
        'modal-travel-costs': '$100 + $35 Jersey',
        'modal-sailors-costs': '$300',
        'modal-rec-registration-info': 'Registration opens in July',
        'modal-travel-deadline': 'July 1st (Late Fees will be imposed)',
        'modal-sailors-deadline': 'July 1st (Late Fees will be imposed)',
        'modal-rec-register-button': 'Register for Rec Soccer',
        'modal-travel-register-button': 'Register for Travel Soccer',
        'modal-sailors-register-button': 'Register for Sailors',
        
        // Footer
        'footer-copyright': '© 2025 Harbor Soccer, Inc. All rights reserved.',
        'footer-tagline': 'Promoting soccer and enhancing each child\'s skill development.'
      },      es: {
        // Page Title
        'page-title': 'Harbor Soccer, Inc.',
          // Navigation
        'nav-programs': 'Programas',
        'nav-registration': 'Registro',
        'nav-about': 'Acerca de',
        'nav-support': 'Apoyo',
        'nav-referee': 'Árbitro',
        'nav-contact': 'Contacto',
        'mobile-menu-title': 'Menú',
        
        // Hero Section
        'hero-title': 'Harbor Soccer',
        'hero-subtitle': 'Promoviendo el fútbol y mejorando el desarrollo de habilidades de cada niño',
        'hero-cta': 'Explora Nuestros Programas',
        
        // Programs Section
        'programs-title': 'Nuestros Programas',
        'rec-soccer-title': 'Fútbol Recreativo',
        'rec-soccer-ages': 'Años de Nacimiento: 2018-2021',
        'rec-soccer-description': 'El Fútbol Recreativo es un programa para niños pequeños en primavera y otoño para introducir el juego de fútbol a aquellos que están emocionados, apasionados, o tal vez solo curiosos sobre el fútbol.',
        'rec-soccer-feature-1': 'El registro estará disponible en julio',
        'rec-soccer-feature-2': 'Tacos y Espinilleras Requeridos',
        'rec-soccer-feature-3': 'Sin Viajes',
        
        'travel-soccer-title': 'Fútbol de Viaje',
        'travel-soccer-ages': 'Años de Nacimiento: 2011-2017',
        'travel-soccer-description': 'El Fútbol de Viaje es un programa que brinda a los jugadores la oportunidad de jugar fútbol competitivamente en las temporadas de primavera y otoño.',
        'travel-soccer-feature-1': 'Entrenamientos dos veces por semana',
        'travel-soccer-feature-2': 'Juegos de niñas los sábados',
        'travel-soccer-feature-3': 'Juegos de niños los domingos',
        'travel-soccer-feature-4': 'Tacos y espinilleras requeridos',
        'travel-soccer-feature-5': 'Viajes dentro del Norte de Michigan',
        'travel-soccer-note': 'Aprende más sobre con quién jugamos en el sitio web de la <a href="https://northernmichigansoccer.com/our-clubs">Alianza del Norte de Michigan</a>.',
        
        'sailors-title': 'Marineros',
        'sailors-ages': 'Niñas de Preparatoria',
        'sailors-description': 'Marineros es un equipo de fútbol de viaje para niñas de preparatoria que compite en juegos y torneos en el otoño.',
        'sailors-contact-title': 'Contacta a la Sra. McShannock para más información',
        
        // Registration Section
        'registration-title': 'Registro',
        'registration-open-title': 'Registro para Otoño 2025 Abierto Ahora',
        'registration-intro': '¡El registro está ahora abierto para la temporada de Otoño 2025! Únete a nuestra comunidad de jóvenes atletas y experimenta la alegría del fútbol en un ambiente de apoyo.',
        'register-button': 'Regístrate Ahora',
        
        // About Section
        'about-title': 'Acerca de Harbor Soccer, Inc.',
        'about-mission-title': 'Nuestra Misión',
        'about-mission-text': 'La misión de Harbor Soccer, Inc. es promover el juego de fútbol y mejorar el desarrollo de habilidades de cada niño. Harbor Soccer, Inc. promoverá el juego limpio en un ambiente divertido, seguro y recreativo mientras fomenta el desarrollo de camaradería, el fomento del trabajo en equipo, y nutre las habilidades de cada jugador individual.',
        'about-governing-text': 'Harbor Soccer, Inc. es la junta directiva, que sirve para organizar y supervisar los equipos de fútbol en el área de Harbor Springs.',
        'about-memberships-title': 'Somos Orgullosos Miembros De',
        'nmsa-full-name': 'Alianza de Fútbol del Norte de Michigan',
        'msysa-full-name': 'Asociación de Fútbol Juvenil del Estado de Michigan',
        'about-board-title': 'Conoce la Junta',
        'board-president': 'Presidente',
        'board-treasurer': 'Tesorero',
        'board-facilities': 'Instalaciones y Secretario',
        'board-registrar': 'Registrador',
        'board-rec-coordinator': 'Coordinador de Fútbol Recreativo',
        'board-member': 'Miembro de la Junta',
        'testimonials-title': 'Lo que Dicen Nuestros Jugadores',
        'testimonial-1': '"Es divertido. He aprendido a hacer malabares. Me gusta jugar para Harbor Soccer."',
        'testimonial-1-author': '— Jai (Fútbol Recreativo)',
        'testimonial-2': '"Es muy divertido. Puedes jugar juegos y todas las posiciones. A veces puedes ser portero. ¡Se siente bien anotar!"',
        'testimonial-2-author': '— Henry (Fútbol de Viaje)',
        'testimonial-3': '"Es muy divertido. Una gran manera de hacer ejercicio. ¡Es un deporte muy bueno para jugar!"',
        'testimonial-3-author': '— Whitely (Fútbol de Viaje)',
        
        // Support Section
        'support-title': 'Apoya a Harbor Soccer',
        'support-intro-1': 'Harbor Soccer apoya a cientos de niños cada temporada en nuestra comunidad. El costo de mantener los campos, equipo de fútbol, sistema séptico y árbitros, son nuestros mayores gastos.',
        'support-intro-2': '¡Nos encantaría tu apoyo! Cada donación nos ayuda a continuar proporcionando programas de fútbol de calidad a jóvenes atletas en el área de Harbor Springs.',
        'support-intro-3': 'Somos una organización 501(c)3 y nuestro EIN es 38-2887596',
        'current-sponsors-title': 'Patrocinadores Actuales',
        'current-sponsors-text': '¡Gracias a nuestros generosos patrocinadores que hacen posible Harbor Soccer!',
        'donation-title': 'Hacer una Donación',
        'donation-text': 'Puedes enviar un cheque por correo a:',
        'sponsorship-title': 'Conviértete en Patrocinador',
        'sponsorship-text': 'Aprende sobre nuestras oportunidades de patrocinio y cómo tu negocio puede apoyar el fútbol juvenil en nuestra comunidad.',
        'sponsorship-coordinator': 'Coordinador de Patrocinios',
        'sponsorship-contact-note': 'Comunícate para discutir paquetes de patrocinio y oportunidades',
        
        // Referee Section
        'referee-title': 'Conviértete en Árbitro',
        'referee-intro-1': 'Actualmente hay una escasez de árbitros en el fútbol juvenil en todo Michigan, y Harbor Soccer está sintiendo este impacto. Necesitamos individuos dedicados que sean apasionados del juego y quieran retribuir a la comunidad arbitrando nuestros partidos.',
        'referee-intro-2': 'Arbitrar es una gran manera de mantenerse involucrado en el fútbol, ganar algunos ingresos extra, y ayudar a asegurar que nuestros jóvenes atletas tengan arbitraje de calidad para sus juegos.',
        'referee-action-title': 'Comienza Hoy',
        'referee-action-text': 'Visita la Asociación de Árbitros del Estado de Michigan para aprender más sobre los requisitos de certificación y comenzar tu viaje como árbitro de fútbol juvenil.',
        'referee-button': 'Visitar Michigan Refs →',
        'referee-contact-note': '¿Preguntas sobre convertirse en árbitro? Contáctanos en <a href="mailto:harborsoccer1@gmail.com">harborsoccer1@gmail.com</a>',
        
        // Contact Section
        'contact-title': 'Contáctanos',
        'contact-location': 'Ubicación',
        'contact-mailing': 'Dirección Postal',
        'contact-email': 'Correo Electrónico',
        
        // Modal Content
        'modal-rec-soccer-title': 'Fútbol Recreativo',
        'modal-travel-soccer-title': 'Fútbol de Viaje',
        'modal-sailors-title': 'Marineros',
        'modal-ages': 'Edades:',
        'modal-costs': 'Costos:',
        'modal-registration': 'Registro:',
        'modal-registration-deadline': 'Fecha Límite de Registro:',
        'modal-rec-soccer-ages': 'Años de Nacimiento: 2018-2021',
        'modal-travel-soccer-ages': 'Años de Nacimiento: 2011-2017',
        'modal-sailors-ages': 'Niñas de Preparatoria',
        'modal-travel-costs': '$100 + $35 Jersey',
        'modal-sailors-costs': '$300',
        'modal-rec-registration-info': 'El registro abre en julio',
        'modal-travel-deadline': '1 de julio (Se impondrán tarifas tardías)',
        'modal-sailors-deadline': '1 de julio (Se impondrán tarifas tardías)',
        'modal-rec-register-button': 'Registrarse para Fútbol Recreativo',
        'modal-travel-register-button': 'Registrarse para Fútbol de Viaje',
        'modal-sailors-register-button': 'Registrarse para Marineros',
        
        // Footer
        'footer-copyright': '© 2025 Harbor Soccer, Inc. Todos los derechos reservados.',
        'footer-tagline': 'Promoviendo el fútbol y mejorando el desarrollo de habilidades de cada niño.'
      }
    };
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateLanguage(this.currentLanguage);
  }
  
  setupEventListeners() {
    const languageBtn = document.getElementById('language-btn');
    const mobileLanguageBtn = document.getElementById('mobile-language-btn');
    
    if (languageBtn) {
      languageBtn.addEventListener('click', () => this.toggleLanguage());
    }
    
    if (mobileLanguageBtn) {
      mobileLanguageBtn.addEventListener('click', () => this.toggleLanguage());
    }
  }
  
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.updateLanguage(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
  }
  updateLanguage(language) {
    const translations = this.translations[language];
    
    // Add fade effect during transition
    document.body.style.opacity = '0.9';
    
    setTimeout(() => {
      // Update all elements with data-key attributes
      document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[key]) {
          // Special handling for title element
          if (element.tagName.toLowerCase() === 'title') {
            element.textContent = translations[key];
          } else {
            element.innerHTML = translations[key];
          }
        }
      });
      
      // Update language toggle buttons
      this.updateLanguageButtons(language);
      
      // Update document language attribute
      document.documentElement.lang = language;
      
      // Restore opacity
      document.body.style.opacity = '1';
    }, 150);
  }
  
  updateLanguageButtons(language) {
    const isSpanish = language === 'es';
    const flag = isSpanish ? '🇪🇸' : '🇺🇸';
    const text = isSpanish ? 'ES' : 'EN';
    
    const buttons = [
      document.getElementById('language-btn'),
      document.getElementById('mobile-language-btn')
    ];
    
    buttons.forEach(button => {
      if (button) {
        const flagIcon = button.querySelector('.flag-icon');
        const langText = button.querySelector('.lang-text');
        
        if (flagIcon) flagIcon.textContent = flag;
        if (langText) langText.textContent = text;
      }
    });
  }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LanguageManager();
});