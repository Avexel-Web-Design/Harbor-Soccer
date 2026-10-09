# AGENTS.md

## Project Overview
Harbor Soccer Inc. website - a static website built with HTML, vanilla CSS, and vanilla JavaScript (ES modules) for a youth soccer organization in Harbor Springs, Michigan.

## Project Structure
```
Harbor-Soccer/
├── index.html              # Main entry point
├── 404.html                # Custom not found page
├── css/
│   └── styles.css          # Site styles (vanilla CSS, edited directly — no build step)
├── js/
│   ├── script.js           # Entry point (imports modules)
│   ├── modules/            # Navigation, modals, registration, calendar, scroll-spy
│   └── utils/              # DOM helpers, scroll-lock
├── images/                 # Images, player photos, sponsor logos
├── documents/              # Board docs, bylaws (PDF)
├── schedules/              # Season schedules (PDF)
└── README.md              # Project documentation
```

## Development Commands

```bash
# Start development server (runs on port 8000)
npm run dev
npm run serve

# Watch and edit CSS directly (no build step — save and refresh)
# No Sass compilation needed
```

**Testing & Linting**: No automated tests. Linting is configured (`npm run check` runs ESLint, Stylelint, and html-validate). Manual browser testing is still required (see Testing Checklist below).

---

## Code Style Guidelines

### JavaScript

**Naming Conventions**
- Variables and functions: camelCase (`mobileToggle`, `handleSwipe()`)
- Constants: UPPER_SNAKE_CASE (`PROGRAM_STATUS`, `MAX_RETRIES`)
- Classes (if used): PascalCase (`Modal`, `Navigation`)

**Code Structure**
```javascript
// Constants at top (see js/modules/registration.js PROGRAM_STATUS map)
const CALENDAR_FALLBACK_DELAY = 3000;

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

### CSS

`css/styles.css` is vanilla CSS with section banners (tokens → base → components A → components B). Edit it directly; there is no preprocessor or build step.

#### Naming Conventions
- **Classes**: kebab-case (`.main-navigation`, `.menu-link`)
- **BEM-like**: `.block__element--modifier`
- **States**: `.element.active`, `.element.disabled`, `.element[hidden]`
- **JavaScript hooks**: `.js-nav-toggle` (never style these)

#### Custom properties
Design tokens live in `:root` at the top of `styles.css`:
```css
:root {
  --color-primary: #b45309;
  --spacing-md: 1.5rem;
}
```
Use `var(--token-name)` instead of hardcoding values. Breakpoints cannot use `var()` in media queries — use literal values (`480px`, `768px`, `1024px`, `1200px`).

#### Responsive Design
```css
@media (max-width: 768px) { }
@media (max-width: 480px) { }
```

#### Best Practices
- Use custom properties instead of magic numbers
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
- Configure program status via the `PROGRAM_STATUS` map in `js/modules/registration.js`
- Per-program `isOpen` flags plus display copy in `REGISTRATION_COPY`
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
