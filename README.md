# Harbor Soccer

Static website for Harbor Soccer, Inc., built with HTML, SCSS, and vanilla JavaScript modules.

## Development

- `npm run serve` - start a local server on port 8000
- `npm run sass` - watch and compile SCSS into `css/`
- `npm run sass:build` - compile SCSS once for production output
- `npm run format` - format HTML, JS, SCSS, CSS, and JSON
- `npm run check` - run JavaScript, SCSS, and HTML validation, then rebuild CSS

## Structure

- `index.html` - main site page
- `404.html` - custom not found page
- `scss/` - source styles, organized by base/layout/components
- `css/` - compiled CSS output used by the site
- `js/` - browser JavaScript modules

## Content updates

- Registration program status and destination links live in `js/modules/registration.js`
- Shared interaction logic for navigation and modals lives in `js/modules/`
- Visual tokens live in `scss/abstracts/_variables.scss`

## Manual QA checklist

- Desktop, tablet, and mobile navigation
- Registration and sponsorship modals
- Calendar loading state and schedule downloads
- Keyboard navigation and Escape-to-close behavior
- 404 redirect and direct return-home link
