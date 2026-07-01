# Contributing to Eclipse

This guide explains how to add themes and modify the extension.

## Adding a New Theme

Predefined themes are stored in `src/themes.json`.

### Steps to Add a Theme

1. **Fork the Repository**: Click the "Fork" button on GitHub.
2. **Edit `themes.json`**: Open `src/themes.json`.
3. **Add Your Theme**: Add a new key-value pair for your theme. Follow this structure:

```json
  "yourthemename": {
    "name": "Your Theme Name",
    "bg": "#121212",
    "text": "#e0e0e0",
    "link": "#5099de",
    "accent": "#1e1e1e"
  }
```

- `bg`: Background color.
- `text`: Primary text color.
- `link`: Hyperlink color.
- `accent`: Color for borders, table outlines and form controls.

4. **Test Locally**:
   - Go to `chrome://extensions/`.
   - Enable "Developer mode".
   - Click "Load unpacked" and select your project folder.
   - Verify that your theme applies correctly.

5. **Submit a Pull Request**: Commit your changes, push to your fork and open a Pull Request.

## Developing the Code

Core logic is located at:
- `src/dark.css`: Base styles applied to the page.
- `src/content.js`: Handles fetching and applying CSS variables.
- `src/sidepanel.js`: Handles UI logic for the extension menu.
- `docs/`: Contains the landing page.

Ensure you use clear, concise commit messages. Do not use emojis in your code or documentation.
