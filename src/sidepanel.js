const themeSelect = document.getElementById('theme-select');
const customColorsDiv = document.getElementById('custom-colors');
const saveCustomBtn = document.getElementById('save-custom');

const customCssTextarea = document.getElementById('custom-css');
const saveCssBtn = document.getElementById('save-css');

const powerToggle = document.getElementById('power-toggle');

const colorBg = document.getElementById('color-bg');
const colorText = document.getElementById('color-text');
const colorLink = document.getElementById('color-link');
const colorAccent = document.getElementById('color-accent');

function loadPreferences() {
  chrome.storage.local.get(['eclipseEnabled', 'eclipseTheme', 'eclipseCustomColors', 'eclipseCustomCss'], (result) => {
    if (result.eclipseEnabled !== undefined) {
      powerToggle.checked = result.eclipseEnabled;
    }
    
    if (result.eclipseTheme) {
      themeSelect.value = result.eclipseTheme;
      if (result.eclipseTheme === 'custom') {
        customColorsDiv.classList.remove('hidden');
      }
    }
    
    if (result.eclipseCustomColors) {
      colorBg.value = result.eclipseCustomColors.bg;
      colorText.value = result.eclipseCustomColors.text;
      colorLink.value = result.eclipseCustomColors.link;
      colorAccent.value = result.eclipseCustomColors.accent;
    }
    
    if (result.eclipseCustomCss) {
      customCssTextarea.value = result.eclipseCustomCss;
    }
  });
}

// Fetch themes and populate dropdown
fetch(chrome.runtime.getURL('themes.json'))
  .then(response => response.json())
  .then(themes => {
    themeSelect.innerHTML = '';
    for (const [key, value] of Object.entries(themes)) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = value.name || key;
      themeSelect.appendChild(option);
    }
    const customOption = document.createElement('option');
    customOption.value = 'custom';
    customOption.textContent = 'Custom...';
    themeSelect.appendChild(customOption);
    
    loadPreferences();
  })
  .catch(err => console.error('Failed to load themes for dropdown:', err));

themeSelect.addEventListener('change', (e) => {
  const selected = e.target.value;
  chrome.storage.local.set({ eclipseTheme: selected });
  
  if (selected === 'custom') {
    customColorsDiv.classList.remove('hidden');
  } else {
    customColorsDiv.classList.add('hidden');
  }
});

powerToggle.addEventListener('change', (e) => {
  chrome.storage.local.set({ eclipseEnabled: e.target.checked });
});

saveCustomBtn.addEventListener('click', () => {
  const customColors = {
    bg: colorBg.value,
    text: colorText.value,
    link: colorLink.value,
    accent: colorAccent.value
  };
  
  chrome.storage.local.set({ eclipseCustomColors: customColors }, () => {
    // Optional: Visual feedback
    const originalText = saveCustomBtn.textContent;
    saveCustomBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Saved!';
    setTimeout(() => {
      saveCustomBtn.innerHTML = originalText;
    }, 1500);
  });
});

saveCssBtn.addEventListener('click', () => {
  const css = customCssTextarea.value;
  chrome.storage.local.set({ eclipseCustomCss: css }, () => {
    const originalText = saveCssBtn.innerHTML;
    saveCssBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Saved CSS!';
    setTimeout(() => {
      saveCssBtn.innerHTML = originalText;
    }, 1500);
  });
});
