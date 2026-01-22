# AGENTS.md

## Project Overview
Harbor Soccer Inc. website - a static website built with HTML, SCSS, and vanilla JavaScript for a youth soccer organization in Harbor Springs, Michigan.

## Development Commands

```bash
# Start development server (runs on port 8000)
npm run dev
npm run serve

# Watch and compile SCSS files automatically
npm run sass

# Compile SCSS files once
npm run sass:build
```

**Note**: This is a static website project with no automated tests or linting tools configured. Manual testing in the browser is required.

---

## Code Style Guidelines

### JavaScript
**Naming**: camelCase for vars/funcs (e.g., `mobileToggle`, `handleSwipe()`), UPPER_SNAKE_CASE for constants (`PROGRAM_STATUS`)
**Structure**: Declare event listeners at top level, use `DOMContentLoaded` for init
**Patterns**: Use `const`/`let`, arrow functions, template literals, `classList` methods
**Events**: Always use `addEventListener`, use `{ passive: true }` for touch when possible
**Safety**: Check null/undefined before accessing properties, use optional chaining
**Accessibility**: Include `aria-label`, `aria-expanded`, manage focus, support keyboard (Escape)

---

### SCSS/CSS

#### File Organization
```
scss/
├── abstracts/_variables.scss    # Colors, fonts, spacing, shadows
├── base/                         # Reset, typography, base styles
├── layout/                       # Grid systems
├── components/                   # UI components
└── styles.scss                   # Main entry point
```

#### Importing
Use modern `@use` syntax:
```scss
@use '../abstracts/variables' as *;
@use 'sass:color';
```

#### Naming Conventions
- **Classes**: kebab-case with descriptive names (e.g., `.main-navigation`, `.menu-link`)
- Use BEM-like patterns for complex components
- Modifiers: `.element--modifier`
- States: `.element.active`, `.element.disabled`

#### SCSS Variables
Use `$` prefix with semantic prefixes:
```scss
$color-primary, $color-secondary, $color-error
$spacing-xs, $spacing-sm, $spacing-md, $spacing-lg
$font-primary, $font-sans, $font-weight-bold
$shadow-sm, $shadow-md, $shadow-lg
$transition-fast, $transition-base, $transition-slow
$radius-sm, $radius-md, $radius-lg
$breakpoint-mobile, $breakpoint-tablet, $breakpoint-desktop
```

#### Nesting
- Nest selectors 2-3 levels maximum
- Use `&` for parent selectors:
```scss
.button {
  &:hover { }
  &:focus-visible { }
  &.active { }
}
```

#### Responsive Design
Use media queries with variables:
```scss
@media (max-width: $breakpoint-tablet) {
  // tablet styles
}
@media (max-width: $breakpoint-mobile) {
  // mobile styles
}
```

#### Best Practices
- Use `color.adjust()` and `color.scale()` for color manipulation
- Use variables instead of magic numbers
- Include vendor prefixes for older browsers (`-webkit-`, `-ms-`)
- Add focus-visible styles for keyboard accessibility
- Use `backdrop-filter: blur()` for modern glass effects

---

### HTML

#### Structure
- Use HTML5 semantic tags: `<nav>`, `<section>`, `<main>`, `<footer>`
- Include proper meta tags: charset, viewport, description
- Order elements logically for accessibility

#### Attributes
- Always include `alt` text on images
- Use `aria-label` for icon-only buttons
- Use `aria-expanded` on toggle buttons
- Include `lang` attribute on `<html>`

#### Formatting
- Use 2-space indentation
- Self-closing tags for void elements: `<br />`, `<img />`
- Close all tags properly

---

## Key Components

### Navigation
- Desktop: always visible with hover effects
- Mobile: hamburger toggle with swipe gestures
- Scroll-based state changes (`.scrolled` class)
- Smooth scroll to anchor links

### Registration System
- Configure program status via `PROGRAM_STATUS` constant in script.js
- Automatically updates UI based on open/closed status
- Modal with program selection
- Keyboard and touch accessible

### Modals
- Open via button click
- Close via X button, overlay click, Escape key, or swipe down
- Prevent background scrolling when open
- Return focus to trigger button on close

---

## Testing Checklist
Since there are no automated tests, manually verify:
- All links navigate correctly
- Forms submit properly (if any)
- Responsive design works on mobile/tablet/desktop
- Modals open/close correctly
- Keyboard navigation works (Tab, Escape, Enter)
- Touch gestures work (swipe to close menus/modals)
- Scroll effects trigger at appropriate points
- Accessibility with screen readers (semantic HTML, ARIA labels)
