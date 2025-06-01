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

// Team Information System
const teamData = {
  travel: {
    boys: {
      u10: {
        name: "U10 Boys Travel Team",
        badge: "travel",
        description: "Competitive travel soccer for boys under 10. Focus on skill development, teamwork, and sportsmanship.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "6:00 PM - 7:30 PM",
          "Game Day": "Sunday",
          "Game Time": "Varies (10:00 AM - 4:00 PM)",
          "Season": "April - June"
        },
        coach: {
          name: "Coach Mike Thompson",
          email: "mike.thompson@harborsoccer.org",
          phone: "(555) 123-4501"
        },
        equipment: ["Cleats (no metal studs)", "Shin guards", "Practice jersey (provided)", "Game jersey (provided)", "Water bottle"],
        additionalInfo: "Travel to nearby communities for games. Parent volunteers needed for game day support."
      },
      u12: {
        name: "U12 Boys Travel Team",
        badge: "travel",
        description: "Advanced travel soccer for boys under 12. Emphasis on tactical awareness and competitive play.",
        schedule: {
          "Practice Days": "Monday & Wednesday",
          "Practice Time": "6:30 PM - 8:00 PM",
          "Game Day": "Sunday",
          "Game Time": "Varies (10:00 AM - 4:00 PM)",
          "Season": "April - June"
        },
        coach: {
          name: "Coach David Rodriguez",
          email: "david.rodriguez@harborsoccer.org",
          phone: "(555) 123-4502"
        },
        equipment: ["Cleats (no metal studs)", "Shin guards", "Practice jersey (provided)", "Game jersey (provided)", "Water bottle"],
        additionalInfo: "Higher level of competition with emphasis on player development and game strategy."
      },
      u14: {
        name: "U14 Boys Travel Team",
        badge: "travel",
        description: "Elite travel soccer for boys under 14. Focus on advanced tactics, fitness, and competitive excellence.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "7:00 PM - 8:30 PM",
          "Game Day": "Sunday",
          "Game Time": "Varies (10:00 AM - 4:00 PM)",
          "Season": "April - June"
        },
        coach: {
          name: "Coach James Wilson",
          email: "james.wilson@harborsoccer.org",
          phone: "(555) 123-4503"
        },
        equipment: ["Cleats (no metal studs)", "Shin guards", "Practice jersey (provided)", "Game jersey (provided)", "Water bottle"],
        additionalInfo: "Premier level of travel soccer with potential for tournament play and advanced skill development."
      }
    },
    girls: {
      u10: {
        name: "U10 Girls Travel Team",
        badge: "travel",
        description: "Competitive travel soccer for girls under 10. Building confidence and skills through structured play.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "5:30 PM - 7:00 PM",
          "Game Day": "Saturday",
          "Game Time": "Varies (9:00 AM - 3:00 PM)",
          "Season": "April - June"
        },
        coach: {
          name: "Coach Sarah Johnson",
          email: "sarah.johnson@harborsoccer.org",
          phone: "(555) 123-4504"
        },
        equipment: ["Cleats (no metal studs)", "Shin guards", "Practice jersey (provided)", "Game jersey (provided)", "Water bottle"],
        additionalInfo: "Travel to nearby communities for games. Focus on building confidence and fundamental skills."
      },
      u12: {
        name: "U12 Girls Travel Team",
        badge: "travel",
        description: "Advanced travel soccer for girls under 12. Developing tactical skills and team chemistry.",
        schedule: {
          "Practice Days": "Monday & Wednesday",
          "Practice Time": "6:00 PM - 7:30 PM",
          "Game Day": "Saturday",
          "Game Time": "Varies (9:00 AM - 3:00 PM)",
          "Season": "April - June"
        },
        coach: {
          name: "Coach Lisa Anderson",
          email: "lisa.anderson@harborsoccer.org",
          phone: "(555) 123-4505"
        },
        equipment: ["Cleats (no metal studs)", "Shin guards", "Practice jersey (provided)", "Game jersey (provided)", "Water bottle"],
        additionalInfo: "Competitive play with emphasis on skill development and sportsmanship."
      },
      u14: {
        name: "U14 Girls Travel Team",
        badge: "travel",
        description: "Elite travel soccer for girls under 14. Advanced tactical training and competitive excellence.",
        schedule: {
          "Practice Days": "Tuesday & Thursday",
          "Practice Time": "6:30 PM - 8:00 PM",
          "Game Day": "Saturday",
          "Game Time": "Varies (9:00 AM - 3:00 PM)",
          "Season": "April - June"
        },
        coach: {
          name: "Coach Maria Garcia",
          email: "maria.garcia@harborsoccer.org",
          phone: "(555) 123-4506"
        },
        equipment: ["Cleats (no metal studs)", "Shin guards", "Practice jersey (provided)", "Game jersey (provided)", "Water bottle"],
        additionalInfo: "Premier level of travel soccer with advanced tactical training and tournament opportunities."
      }
    }
  },
  rec: {
    red: {
      name: "Red",
      badge: "red",
      description: "An energetic team focused on developing fundamental soccer skills while having fun. Perfect for players who want to learn the game in a supportive environment.",
      schedule: {
        "Practice Day": "Wednesday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "9:00 AM - 10:00 AM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Tom Mitchell",
        email: "tom.mitchell@harborsoccer.org",
        phone: "(555) 123-4507"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "All games are played locally at Harbor Springs Soccer Complex. Focus on fun and skill building."
    },
    orange: {
      name: "Orange",
      badge: "orange",
      description: "A vibrant team that emphasizes teamwork and ball skills. Great for players ready to take their game to the next level.",
      schedule: {
        "Practice Day": "Tuesday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "10:15 AM - 11:15 AM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Jennifer Clark",
        email: "jennifer.clark@harborsoccer.org",
        phone: "(555) 123-4508"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "Focus on developing passing skills and game awareness in a fun, encouraging environment."
    },
    yellow: {
      name: "Yellow",
      badge: "yellow",
      description: "A dynamic team that combines skill development with competitive spirit. Perfect for players who love the excitement of soccer.",
      schedule: {
        "Practice Day": "Thursday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "11:30 AM - 12:30 PM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Robert Kim",
        email: "robert.kim@harborsoccer.org",
        phone: "(555) 123-4509"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "Emphasis on speed, agility, and quick decision-making while maintaining a fun atmosphere."
    },
    green: {
      name: "Green",
      badge: "green",
      description: "A fast-paced team focused on developing speed and agility. Great for players who enjoy an active, energetic style of play.",
      schedule: {
        "Practice Day": "Monday",
        "Practice Time": "5:30 PM - 6:30 PM",
        "Game Day": "Saturday",
        "Game Time": "12:45 PM - 1:45 PM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Amanda Foster",
        email: "amanda.foster@harborsoccer.org",
        phone: "(555) 123-4510"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "Focus on cardiovascular fitness, speed training, and quick transitions between offense and defense."
    },
    purple: {
      name: "Purple",
      badge: "purple",
      description: "A creative team that emphasizes technical skills and artistic play. Perfect for players who love to express themselves on the field.",
      schedule: {
        "Practice Day": "Wednesday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "2:00 PM - 3:00 PM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Daniel Martinez",
        email: "daniel.martinez@harborsoccer.org",
        phone: "(555) 123-4511"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "Emphasis on creativity, ball control, and developing individual flair while working as a team."
    },
    "light-blue": {
      name: "Light Blue",
      badge: "light-blue",
      description: "A flowing, coordinated team that focuses on smooth passing and team movement. Great for players who enjoy tactical play.",
      schedule: {
        "Practice Day": "Tuesday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "3:15 PM - 4:15 PM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Michelle Taylor",
        email: "michelle.taylor@harborsoccer.org",
        phone: "(555) 123-4512"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "Focus on possession-based soccer, team coordination, and understanding field positioning."
    },
    pink: {
      name: "Pink",
      badge: "pink",
      description: "A fierce and determined team that combines strength with finesse. Perfect for players who want to develop confidence and competitive spirit.",
      schedule: {
        "Practice Day": "Thursday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "4:30 PM - 5:30 PM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Christina Davis",
        email: "christina.davis@harborsoccer.org",
        phone: "(555) 123-4513"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "Building confidence through positive reinforcement while developing competitive skills and determination."
    },
    "dark-blue": {
      name: "Dark Blue",
      badge: "dark-blue",
      description: "A powerful team focused on strength, endurance, and tactical awareness. Great for players ready for more structured gameplay.",
      schedule: {
        "Practice Day": "Monday",
        "Practice Time": "6:45 PM - 7:45 PM",
        "Game Day": "Saturday",
        "Game Time": "5:45 PM - 6:45 PM",
        "Season": "April - June"
      },
      coach: {
        name: "Coach Kevin O'Brien",
        email: "kevin.obrien@harborsoccer.org",
        phone: "(555) 123-4514"
      },
      equipment: ["Cleats (no metal studs)", "Shin guards", "Team jersey (provided)", "Water bottle"],
      additionalInfo: "Focus on tactical understanding, defensive principles, and developing game intelligence."
    }
  }
};

// Team selector functionality
document.addEventListener('DOMContentLoaded', function() {
  const programTypeSelect = document.getElementById('program-type');
  const travelSelectors = document.getElementById('travel-selectors');
  const recSelectors = document.getElementById('rec-selectors');
  const genderSelect = document.getElementById('gender');
  const ageGroupSelect = document.getElementById('age-group');
  const teamColorSelect = document.getElementById('team-color');
  const noTeamSelected = document.getElementById('no-team-selected');
  const teamScheduleDisplay = document.getElementById('team-schedule-display');

  // Program type change handler
  programTypeSelect.addEventListener('change', function() {
    const selectedProgram = this.value;
    
    // Hide all selectors and info display
    travelSelectors.style.display = 'none';
    recSelectors.style.display = 'none';
    noTeamSelected.style.display = 'block';
    teamScheduleDisplay.style.display = 'none';
    
    // Reset all dependent selectors
    genderSelect.value = '';
    ageGroupSelect.value = '';
    teamColorSelect.value = '';
    
    // Show appropriate selectors
    if (selectedProgram === 'travel') {
      travelSelectors.style.display = 'block';
    } else if (selectedProgram === 'rec') {
      recSelectors.style.display = 'block';
    }
  });

  // Travel selectors change handlers
  genderSelect.addEventListener('change', checkTravelSelection);
  ageGroupSelect.addEventListener('change', checkTravelSelection);
  
  function checkTravelSelection() {
    if (genderSelect.value && ageGroupSelect.value) {
      displayTeamInfo('travel', genderSelect.value, ageGroupSelect.value);
    } else {
      noTeamSelected.style.display = 'block';
      teamScheduleDisplay.style.display = 'none';
    }
  }

  // Rec selector change handler
  teamColorSelect.addEventListener('change', function() {
    if (this.value) {
      displayTeamInfo('rec', this.value);
    } else {
      noTeamSelected.style.display = 'block';
      teamScheduleDisplay.style.display = 'none';
    }
  });

  function displayTeamInfo(program, ...selectors) {
    let teamInfo;
    
    if (program === 'travel') {
      const [gender, ageGroup] = selectors;
      teamInfo = teamData.travel[gender][ageGroup];
    } else if (program === 'rec') {
      const [teamColor] = selectors;
      teamInfo = teamData.rec[teamColor];
    }
    
    if (teamInfo) {
      const scheduleHTML = Object.entries(teamInfo.schedule)
        .map(([key, value]) => `<li><span class="label">${key}:</span> <span class="value">${value}</span></li>`)
        .join('');
      
      const equipmentHTML = teamInfo.equipment
        .map(item => `<li>${item}</li>`)
        .join('');

      // Hide the "no team selected" message
      noTeamSelected.style.display = 'none';

      teamScheduleDisplay.innerHTML = `
        <div class="schedule-header">
          <h3>${teamInfo.name}</h3>
          <span class="team-badge ${teamInfo.badge}">${teamInfo.badge.toUpperCase()}</span>
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
                <a href="mailto:${teamInfo.coach.email}?subject=Question about ${teamInfo.name}" class="contact-coach">Contact Coach</a>
              </div>
            </div>
          </div>
          
          <div class="equipment-requirements">
            <h4>⚽ Required Equipment</h4>
            <ul class="equipment-list">
              ${equipmentHTML}
            </ul>
          </div>
          
          <div class="additional-info">
            <h4>ℹ️ Additional Information</h4>
            <p>${teamInfo.additionalInfo}</p>
          </div>
        </div>
      `;
      
      teamScheduleDisplay.style.display = 'block';
      
      // Smooth scroll to the schedules section
      document.getElementById('schedules').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
});
