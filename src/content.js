// content.js
let themes = {};

// Fetch themes from themes.json
fetch(chrome.runtime.getURL('themes.json'))
  .then(response => response.json())
  .then(data => {
    themes = data;
    loadTheme();
  })
  .catch(err => console.error('Failed to load themes.json:', err));

function applyTheme(theme) {
  let styleEl = document.getElementById('eclipse-theme-vars');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'eclipse-theme-vars';
    document.documentElement.appendChild(styleEl);
  }
  
  const cssVars = `
    :root {
      --eclipse-bg: ${theme.bg} !important;
      --eclipse-text: ${theme.text} !important;
      --eclipse-link: ${theme.link} !important;
      --eclipse-accent: ${theme.accent} !important;
    }
  `;
  styleEl.textContent = cssVars;
}

// Add domain specific class for targeted CSS (e.g. Google Sheets)
if (window.location.hostname.includes('docs.google.com')) {
  document.documentElement.classList.add('eclipse-is-docs');
}

function applyCustomCss(css) {
  let styleEl = document.getElementById('eclipse-custom-user-css');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'eclipse-custom-user-css';
    document.documentElement.appendChild(styleEl);
  }
  styleEl.textContent = css || '';
}

// Initial load
function loadTheme() {
  chrome.storage.local.get(['eclipseTheme', 'eclipseCustomColors', 'eclipseCustomCss'], (result) => {
    const selectedTheme = result.eclipseTheme || 'default';
    if (selectedTheme === 'custom' && result.eclipseCustomColors) {
      applyTheme(result.eclipseCustomColors);
    } else {
      applyTheme(themes[selectedTheme] || themes.default || { bg: '#121212', text: '#e0e0e0', link: '#5099de', accent: '#1e1e1e' });
    }
    
    if (result.eclipseCustomCss !== undefined) {
      applyCustomCss(result.eclipseCustomCss);
    }
  });
}

// Listen for updates from the side panel
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.eclipseTheme || changes.eclipseCustomColors || changes.eclipseCustomCss) {
      loadTheme();
    }
  }
});
