# AGENTS.md

## Project Overview
Harbor Soccer Inc. website - a static website built with HTML, SCSS, and vanilla JavaScript for a youth soccer organization in Harbor Springs, Michigan.

## Project Structure
```
Harbor-Soccer/
├── index.html              # Main entry point
├── css/                   # Compiled CSS output
├── scss/                  # SCSS source files
│   ├── styles.scss        # Main entry point
│   ├── abstracts/         # Variables, mixins, functions
│   ├── base/              # Reset, typography, base styles
│   ├── layout/            # Grid systems, containers
│   └── components/         # UI components (buttons, cards, modals)
├── js/
│   └── script.js          # Main JavaScript file
├── assets/
│   ├── images/            # Images and icons
│   └── fonts/             # Custom fonts
└── README.md              # Project documentation
```

## Development Commands

```bash
# Start development server (runs on port 8000)
npm run dev
npm run serve

# Watch and compile SCSS files automatically (during development)
npm run sass

# Compile SCSS files once (for production builds)
npm run sass:build
```

**Testing & Linting**: This is a static website project with no automated tests or linting tools configured. Manual browser testing is required (see Testing Checklist below).

---

## Code Style Guidelines

### JavaScript

**Naming Conventions**
- Variables and functions: camelCase (`mobileToggle`, `handleSwipe()`)
- Constants: UPPER_SNAKE_CASE (`PROGRAM_STATUS`, `MAX_RETRIES`)
- Classes (if used): PascalCase (`Modal`, `Navigation`)

**Code Structure**
```javascript
// Constants at top
const PROGRAM_STATUS = 'open';

// DOM elements
const mobileToggle = document.querySelector('.mobile-toggle');

// Event listeners at top level
mobileToggle?.addEventListener('click', handleToggle);

// Initialization
document.addEventListener('DOMContentLoaded', init);

function init() { /* ... */ }
```

**Patterns & Best Practices**
- Use `const` by default, `let` only when reassignment needed
- Use arrow functions for callbacks and anonymous functions
- Use template literals for string interpolation
- Use `classList` methods (`add`, `remove`, `toggle`, `contains`)
- Prefer native DOM methods over libraries

**Event Handling**
- Always use `addEventListener`, never inline handlers
- Use `{ passive: true }` for touch and scroll events
- Clean up event listeners when removing elements
- Handle both click and keyboard (Enter/Space) for buttons

**Error Handling**
- Check null/undefined before accessing properties: `element?.classList`
- Use optional chaining: `element?.parentElement?.dataset`
- Wrap potentially failing code in try/catch for critical operations
- Provide fallback values: `const value = data?.prop ?? 'default'`
- Log errors gracefully without breaking user experience

**Safety & Performance**
- Cache DOM queries: store references, don't query repeatedly
- Use `documentFragment` for batch DOM updates
- Debounce resize/scroll handlers
- Use `requestAnimationFrame` for animations
- Avoid global variables; wrap in IIFE or use modules

---

### SCSS/CSS

#### File Organization
```
scss/
├── abstracts/
│   ├── _variables.scss    # Colors, fonts, spacing, shadows
│   └── _mixins.scss       # Reusable SCSS mixins
├── base/
│   ├── _reset.scss        # CSS reset
│   └── _typography.scss   # Font styles
├── layout/
│   └── _grid.scss         # Grid system
├── components/
│   ├── _buttons.scss      # Button styles
│   ├── _cards.scss        # Card components
│   └── _modals.scss       # Modal styles
└── styles.scss            # Main entry point (imports others)
```

#### Importing
Use modern `@use` syntax (not `@import`):
```scss
@use '../abstracts/variables' as *;
@use 'sass:color';
@use '../components/buttons';
```

#### Naming Conventions
- **Classes**: kebab-case (`.main-navigation`, `.menu-link`)
- **BEM-like**: `.block__element--modifier`
- **States**: `.element.active`, `.element.disabled`, `.element[hidden]`
- **JavaScript hooks**: `.js-nav-toggle` (never style these)

#### SCSS Variables
Use semantic prefixes:
```scss
// Colors
$color-primary, $color-secondary, $color-error, $color-success

// Spacing
$spacing-xs, $spacing-sm, $spacing-md, $spacing-lg, $spacing-xl

// Typography
$font-primary, $font-sans, $font-weight-bold

// Effects
$shadow-sm, $shadow-md, $shadow-lg
$transition-fast, $transition-base, $transition-slow

// Layout
$radius-sm, $radius-md, $radius-lg
$breakpoint-mobile, $breakpoint-tablet, $breakpoint-desktop
```

#### Nesting
- Maximum 2-3 levels deep
- Use `&` for parent selector
```scss
.button {
  &:hover { }
  &:focus-visible { }
  &.active { }
  &--primary { }
}
```

#### Responsive Design
```scss
@media (max-width: $breakpoint-tablet) { }
@media (max-width: $breakpoint-mobile) { }
```

#### Best Practices
- Use `color.adjust()` and `color.scale()` for color manipulation
- Use variables instead of magic numbers
- Include vendor prefixes for older browsers (`-webkit-`, `-ms-`)
- Add `focus-visible` styles for keyboard accessibility
- Use `backdrop-filter: blur()` for glass effects
- Group related properties together

---

### HTML

#### Structure
- Use HTML5 semantic tags: `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`
- Include proper meta tags: charset, viewport, description
- Order elements logically (header → main → footer)
- Use `<article>` for self-contained content, `<aside>` for sidebar

#### Attributes
- Always include `alt` text on images
- Use `aria-label` for icon-only buttons
- Use `aria-expanded` on toggle buttons
- Use `aria-hidden` on decorative elements
- Include `lang="en"` on `<html>`
- Use `type` attribute on `<script>` and `<style>`

#### Formatting
- Use 2-space indentation
- Self-closing tags for void elements: `<br>`, `<img>`, `<input>`
- Close all tags properly
- Quote attribute values: `<a href="#">` not `<a href=#>`

---

## Key Components

### Navigation
- Desktop: always visible with hover effects
- Mobile: hamburger toggle with touch/swipe gestures
- Scroll-based state changes (`.scrolled` class)
- Smooth scroll to anchor links via `scroll-behavior: smooth`

### Registration System
- Configure program status via `PROGRAM_STATUS` constant in script.js
- Values: `'open'`, `'closed'`, or `'waitlist'`
- Automatically updates UI based on status
- Modal with program selection
- Keyboard and touch accessible

### Modals
- Open via button click, close via X/overlay/Escape/swipe
- Prevent background scrolling when open
- Return focus to trigger button on close
- Trap focus inside modal when open

---

## Testing Checklist

Since there are no automated tests, manually verify in browser:

**Links & Navigation**
- [ ] All links navigate correctly
- [ ] Anchor links scroll smoothly to sections
- [ ] Mobile menu opens/closes properly

**Forms & Interaction**
- [ ] Forms submit properly (if any)
- [ ] Form validation works (if any)

**Responsive Design**
- [ ] Mobile (375px), tablet (768px), desktop (1200px+)
- [ ] No horizontal scroll on any viewport
- [ ] Touch targets are at least 44px

**Modals & Overlays**
- [ ] Modals open/close correctly
- [ ] Overlay click closes modal
- [ ] ESC key closes modal
- [ ] Focus returns to trigger button

**Accessibility**
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Space, Escape)
- [ ] Focus indicators visible
- [ ] Touch gestures work (swipe to close menus/modals)
- [ ] Screen reader compatible (semantic HTML, ARIA labels)

**Visual**
- [ ] Scroll effects trigger at appropriate points
- [ ] Animations run smoothly (60fps)
- [ ] Images load without layout shift
