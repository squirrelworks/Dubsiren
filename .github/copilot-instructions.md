# Dubsiren - AI Coding Instructions

## Project Overview
Dubsiren is a minimal toy/demo frontend application. No build system, package manager, or dependencies. Static HTML+JavaScript deployment.

## Architecture & Patterns

### File Structure
- **index.html** - Single entry point; defines DOM elements (e.g., `#trigger` button)
- **assets/js/app.js** - All application logic; loaded synchronously in HTML head
- **DOM-driven approach** - All state and behavior tied directly to DOM elements with IDs

### Code Patterns
1. **DOM Selection & Events**
   - Use `document.getElementById()` to select elements (elements require IDs in HTML)
   - Attach listeners with `addEventListener()` for interactivity
   - Example: See [assets/js/app.js](assets/js/app.js) - button click triggers alert

2. **Element Binding Convention**
   - HTML button: `<button id="trigger">test</button>`
   - JS access: `const trigger=document.getElementById('trigger')`
   - Pattern: name HTML IDs in lowercase, use camelCase for JS variables

3. **No Framework Dependencies**
   - Vanilla JavaScript only; no libraries
   - All DOM manipulation direct
   - Keep scripts focused on event handling and simple state transitions

## Development Workflow

### Testing Changes
- Open `index.html` in a browser directly (no server required)
- Click interactive elements to verify behavior
- Check browser console for errors (F12 → Console tab)

### Adding Features
- New UI elements: Add to [index.html](index.html) with unique ID
- New behavior: Add event listeners in [assets/js/app.js](assets/js/app.js) following existing pattern
- Keep one responsibility per event handler

### Common Modifications
- **Changing button text** - Edit `<button id="trigger">` content in HTML
- **Changing alert message** - Update string in `alert()` call in JS
- **Adding new buttons** - Create `<button id="newName">` and corresponding listener

## Important Conventions
- Minified/condensed style in JS is acceptable; readability is acceptable
- No external CDNs or build processes
- Script loads in `<head>` synchronously - keep `app.js` lightweight
- Direct DOM manipulation; no virtual DOM or state management libraries
