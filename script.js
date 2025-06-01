// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });
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

// Contact form handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    // For this demo, we'll just show a success message
    showMessage(
      "Thank you for your message! We'll get back to you soon.",
      "success"
    );

    // Reset form
    this.reset();
  });
}

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
    if (navMenu.classList.contains("active")) {
      closeMobileMenu();
      hamburger.focus(); // Return focus to hamburger button
    }
  }

  // Trap focus within mobile menu when open
  if (navMenu.classList.contains("active")) {
    const focusableElements = navMenu.querySelectorAll(
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

// Enhanced form submission validation
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isFormValid = true;
    const formFields = this.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );

    formFields.forEach((field) => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Simulate form submission
      const submitButton = this.querySelector(".submit-button");
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      setTimeout(() => {
        showMessage(
          "Thank you for your message! We'll get back to you soon.",
          "success"
        );
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    } else {
      showMessage("Please fix the errors above and try again.", "error");
    }
  });
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

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
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
    });
  }
});

// Function to show form messages
function showFormMessage(type, message) {
  // Remove any existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.innerHTML = `
    <div class="form-message-content">
      <span class="form-message-icon">${type === 'success' ? '✅' : '❌'}</span>
      <span class="form-message-text">${message}</span>
    </div>
  `;
  
  // Insert message before the form
  const contactForm = document.querySelector('.contact-form');
  contactForm.parentNode.insertBefore(messageDiv, contactForm);
  
  // Auto-remove success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
  
  // Scroll message into view
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
