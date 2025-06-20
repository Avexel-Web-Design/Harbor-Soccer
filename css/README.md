# Harbor Soccer Club CSS Structure

This project has been organized into a modular CSS architecture for better maintainability and development workflow.

## Directory Structure

```
css/
├── main.css                 # Main import file
├── base/                    # Foundational styles
│   ├── reset.css           # CSS reset and base styles
│   ├── typography.css      # Font and text styles
│   ├── utilities.css       # Utility classes and helpers
│   ├── responsive.css      # Media queries and responsive design
│   └── accessibility.css   # Accessibility improvements
├── components/              # Reusable UI components
│   ├── navigation.css      # Navigation bar and menu
│   ├── mobile-menu.css     # Mobile menu overlay
│   ├── modal.css           # Modal dialogs
│   ├── forms.css           # Form styles and states
│   └── footer.css          # Footer component
└── sections/                # Page sections
    ├── hero.css            # Hero section
    ├── programs.css        # Programs section
    ├── registration.css    # Registration section
    ├── about.css           # About section
    ├── contact.css         # Contact section
    ├── referee.css         # Referee section
    ├── support.css         # Support/donations section
    ├── team-info.css       # Team information section
    └── schedules.css       # Schedules section
```

## Usage

### Option 1: Use the Main CSS File (Recommended for Development)
Replace your current stylesheet import with:
```html
<link rel="stylesheet" href="css/main.css">
```

### Option 2: Import Individual Files
If you only need specific sections, you can import them individually:
```html
<link rel="stylesheet" href="css/base/reset.css">
<link rel="stylesheet" href="css/base/typography.css">
<link rel="stylesheet" href="css/components/navigation.css">
<link rel="stylesheet" href="css/sections/hero.css">
<!-- etc. -->
```

## Benefits of This Structure

1. **Maintainability**: Each file focuses on a specific component or section
2. **Reusability**: Components can be easily reused across different pages
3. **Collaboration**: Multiple developers can work on different sections without conflicts
4. **Performance**: Can load only necessary CSS for specific pages
5. **Organization**: Easy to find and modify specific styles
6. **Debugging**: Easier to locate and fix styling issues

## File Descriptions

### Base Files
- **reset.css**: CSS reset, box-sizing, and body styles
- **typography.css**: All typography-related styles (headings, paragraphs, fonts)
- **utilities.css**: Utility classes like `.container` and `.section-title`
- **responsive.css**: All media queries and responsive design rules
- **accessibility.css**: Focus indicators, reduced motion, and high contrast support

### Component Files
- **navigation.css**: Main navigation bar, logo, and desktop menu
- **mobile-menu.css**: Mobile menu overlay with animations
- **modal.css**: Modal dialogs for registration and sponsorship
- **forms.css**: Form styling, validation states, and success messages
- **footer.css**: Footer component styles

### Section Files
Each section file contains all styles specific to that section, including:
- Layout and positioning
- Component-specific styles
- Hover and interaction effects
- Section-specific responsive design

## Migration Notes

The original `styles.css` file has been completely split into these modular files. All styles have been preserved and organized logically. The `hero-logo.css` file remains separate as it was already modular.

## Production Considerations

For production deployment, consider:
1. Combining and minifying CSS files
2. Using a build process to concatenate imports
3. Critical CSS inlining for above-the-fold content
4. CDN deployment for faster loading

## Development Workflow

When adding new styles:
1. Identify if it's a base style, component, or section-specific
2. Add to the appropriate file
3. Test that imports are working correctly
4. Consider responsive and accessibility implications
