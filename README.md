# Harbor Soccer

Static website for Harbor Soccer, Inc., built with HTML, vanilla CSS, and vanilla JavaScript modules.

## Development

- `npm run serve` - start a local server on port 8000
- `npm run format` - format HTML, JS, CSS, and JSON
- `npm run check` - run JavaScript, CSS, and HTML validation

## Structure

- `index.html` - main site page
- `404.html` - custom not found page
- `css/` - site styles; `styles.css` is vanilla CSS edited directly (no build step)
- `js/` - browser JavaScript modules

## Content updates

- Registration program status and destination links live in `js/modules/registration.js`
- Shared interaction logic for navigation and modals lives in `js/modules/`
- Visual tokens live in the `:root` block at the top of `css/styles.css`

## Manual QA checklist

- Desktop, tablet, and mobile navigation
- Registration and sponsorship modals
- Calendar loading state and schedule downloads
- Keyboard navigation and Escape-to-close behavior
- 404 redirect and direct return-home link
