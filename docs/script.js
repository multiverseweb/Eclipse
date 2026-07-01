const themeButtonsContainer = document.getElementById('theme-buttons');
const root = document.documentElement;

// Fetch themes from the repository
fetch('https://raw.githubusercontent.com/multiverseweb/Eclipse/main/src/themes.json')
  .then(response => response.json())
  .then(themes => {
    let first = true;
    for (const [key, theme] of Object.entries(themes)) {
      const btn = document.createElement('button');
      btn.className = 'theme-btn';
      if (first) {
        btn.classList.add('active');
        applyThemePreview(theme);
        first = false;
      }
      btn.textContent = theme.name;
      btn.onclick = () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyThemePreview(theme);
      };
      themeButtonsContainer.appendChild(btn);
    }
  })
  .catch(err => {
    console.error('Error fetching themes.json:', err);
    themeButtonsContainer.innerHTML = '<p>Could not load themes. Make sure you are viewing this on GitHub Pages.</p>';
  });

function applyThemePreview(theme) {
  root.style.setProperty('--preview-bg', theme.bg);
  root.style.setProperty('--preview-text', theme.text);
  root.style.setProperty('--preview-link', theme.link);
  root.style.setProperty('--preview-accent', theme.accent);
}

// Set dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();
