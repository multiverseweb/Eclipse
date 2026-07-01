# Contributing to Eclipse

Thank you for your interest in contributing to Eclipse! This guide will help you add new themes or improve the extension.

## Adding a New Theme

Eclipse is designed so that anyone can add new themes without knowing how to write complex code. All predefined themes are stored in `src/themes.json`.

### Steps to Add a Theme

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your own copy of the project.
2. **Edit `themes.json`**: Open the `src/themes.json` file.
3. **Add Your Theme**: Add a new key-value pair for your theme. Make sure to follow the existing structure:

```json
  "yourthemename": {
    "name": "Your Awesome Theme",
    "bg": "#121212",
    "text": "#e0e0e0",
    "link": "#5099de",
    "accent": "#1e1e1e"
  }
```

- `bg`: The background color for pages.
- `text`: The primary text color.
- `link`: The color for hyperlinks.
- `accent`: The color for borders, table outlines, and form controls.

4. **Test Locally**:
   - Go to `chrome://extensions/` in your browser.
   - Enable "Developer mode".
   - Click "Load unpacked" and select your project folder.
   - Verify that your theme shows up in the side panel and applies correctly.

5. **Submit a Pull Request**: Commit your changes, push to your fork, and open a Pull Request against the main repository.

## Developing the Code

If you want to modify the styling engine, the core logic is inside:
- `src/dark.css`: The base styles applied to the page.
- `src/content.js`: Handles dynamically fetching and applying the CSS variables.
- `src/sidepanel.js`: Handles the UI logic for the extension menu.
- `website/`: Contains the landing page.

Ensure you use clear, concise commit messages. Please do not use emojis in your code or documentation.

We appreciate all contributions!
