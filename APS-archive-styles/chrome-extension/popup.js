/**
 * APS Archive Branding POC - Popup Controller
 * Manages user settings and communicates with content script
 */

console.log('popup.js loaded');

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  injectCSS: true,
  injectJS: true
};

// DOM Elements - will be initialized when DOM is ready
let enabledToggle;
let cssToggle;
let jsToggle;
let refreshBtn;
let resetBtn;
let statusDiv;

/**
 * Load saved settings from Chrome storage
 */
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(DEFAULT_SETTINGS);
    return result;
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to Chrome storage
 */
async function saveSettings(settings) {
  try {
    await chrome.storage.sync.set(settings);
    console.log('Settings saved:', settings);
    updateStatus(settings);
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Update UI with current settings
 */
function updateUI(settings) {
  enabledToggle.checked = settings.enabled;
  cssToggle.checked = settings.injectCSS;
  jsToggle.checked = settings.injectJS;

  // Disable CSS/JS toggles if main toggle is off
  cssToggle.disabled = !settings.enabled;
  jsToggle.disabled = !settings.enabled;

  updateStatus(settings);
}

/**
 * Update status message
 */
function updateStatus(settings) {
  if (settings.enabled) {
    statusDiv.className = 'status active';
    const features = [];
    if (settings.injectCSS) features.push('CSS');
    if (settings.injectJS) features.push('JS');
    statusDiv.textContent = features.length > 0
      ? `✓ Active: ${features.join(' + ')}`
      : '✓ Enabled (no features selected)';
  } else {
    statusDiv.className = 'status inactive';
    statusDiv.textContent = '○ Inactive - Toggle to enable';
  }
}

/**
 * Get current settings from UI
 */
function getCurrentSettings() {
  return {
    enabled: enabledToggle.checked,
    injectCSS: cssToggle.checked,
    injectJS: jsToggle.checked
  };
}

/**
 * Apply settings and reload the page
 */
async function applyAndRefresh() {
  const settings = getCurrentSettings();
  await saveSettings(settings);

  // Get current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Only reload if we're on archive.aps.org
  if (tab && tab.url && tab.url.includes('archive.aps.org')) {
    chrome.tabs.reload(tab.id);
    window.close(); // Close popup after applying
  } else {
    statusDiv.className = 'status inactive';
    statusDiv.textContent = '⚠ Please navigate to archive.aps.org';
  }
}

/**
 * Reset to default settings
 */
async function resetSettings() {
  await saveSettings(DEFAULT_SETTINGS);
  updateUI(DEFAULT_SETTINGS);
}

/**
 * Handle toggle changes
 */
function handleToggleChange() {
  const settings = getCurrentSettings();

  // Auto-disable CSS/JS if main toggle is off
  if (!settings.enabled) {
    cssToggle.disabled = true;
    jsToggle.disabled = true;
  } else {
    cssToggle.disabled = false;
    jsToggle.disabled = false;
  }

  updateStatus(settings);
}

/**
 * Initialize popup
 */
async function init() {
  console.log('Popup init() starting...');

  // Get DOM elements
  enabledToggle = document.getElementById('enabledToggle');
  cssToggle = document.getElementById('cssToggle');
  jsToggle = document.getElementById('jsToggle');
  refreshBtn = document.getElementById('refreshBtn');
  resetBtn = document.getElementById('resetBtn');
  statusDiv = document.getElementById('status');

  // Verify DOM elements exist
  if (!enabledToggle || !cssToggle || !jsToggle || !refreshBtn || !resetBtn || !statusDiv) {
    const missing = [];
    if (!enabledToggle) missing.push('enabledToggle');
    if (!cssToggle) missing.push('cssToggle');
    if (!jsToggle) missing.push('jsToggle');
    if (!refreshBtn) missing.push('refreshBtn');
    if (!resetBtn) missing.push('resetBtn');
    if (!statusDiv) missing.push('statusDiv');
    throw new Error('Required DOM elements not found: ' + missing.join(', '));
  }

  console.log('DOM elements verified');

  // Load and apply settings
  const settings = await loadSettings();
  console.log('Settings loaded:', settings);
  updateUI(settings);

  // Event listeners
  enabledToggle.addEventListener('change', handleToggleChange);
  cssToggle.addEventListener('change', handleToggleChange);
  jsToggle.addEventListener('change', handleToggleChange);

  refreshBtn.addEventListener('click', applyAndRefresh);
  resetBtn.addEventListener('click', resetSettings);

  // Check if we're on the right domain
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url && !tab.url.includes('archive.aps.org')) {
    statusDiv.className = 'status inactive';
    statusDiv.textContent = '⚠ Not on archive.aps.org';
  }
}

// Start the popup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startPopup);
} else {
  // DOM is already ready
  startPopup();
}

function startPopup() {
  console.log('Starting popup...');
  init().catch((error) => {
    console.error('Popup initialization error:', error);
    // Try to show error in status div
    const statusDiv = document.getElementById('status');
    if (statusDiv) {
      statusDiv.className = 'status inactive';
      statusDiv.textContent = '⚠ Error: ' + error.message;
      statusDiv.style.display = 'block';
    }
    // Also show in body if status div not found
    document.body.innerHTML += `<div style="padding: 20px; color: red; background: #ffe6e6;">
      <strong>Error:</strong> ${error.message}
    </div>`;
  });
}
