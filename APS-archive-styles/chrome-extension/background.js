/**
 * APS Archive Branding POC - Background Service Worker
 * Handles extension lifecycle and initialization
 */

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  injectCSS: true,
  injectJS: true
};

/**
 * Initialize extension on install
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('APS Archive Branding POC installed:', details.reason);

  // Set default settings on fresh install
  if (details.reason === 'install') {
    try {
      await chrome.storage.sync.set(DEFAULT_SETTINGS);
      console.log('Default settings initialized');
    } catch (error) {
      console.error('Error setting default settings:', error);
    }
  }

  // Log update
  if (details.reason === 'update') {
    console.log('Extension updated to version', chrome.runtime.getManifest().version);
  }
});

/**
 * Handle messages from popup or content scripts
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);

  if (request.action === 'getSettings') {
    // Return current settings
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      sendResponse({ settings });
    });
    return true; // Keep channel open for async response
  }

  if (request.action === 'applySettings') {
    // Save settings and reload active tab
    chrome.storage.sync.set(request.settings, () => {
      console.log('Settings saved:', request.settings);

      // Reload the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes('archive.aps.org')) {
          chrome.tabs.reload(tabs[0].id);
        }
      });

      sendResponse({ success: true });
    });
    return true; // Keep channel open for async response
  }

  if (request.action === 'ping') {
    sendResponse({ status: 'alive' });
  }
});

/**
 * Update extension icon based on settings
 */
async function updateIcon() {
  try {
    const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

    // You can change icon color/badge based on enabled state
    if (settings.enabled) {
      chrome.action.setBadgeText({ text: '' });
      chrome.action.setBadgeBackgroundColor({ color: '#00b48d' });
    } else {
      chrome.action.setBadgeText({ text: 'OFF' });
      chrome.action.setBadgeBackgroundColor({ color: '#6b6b6c' });
    }
  } catch (error) {
    console.error('Error updating icon:', error);
  }
}

/**
 * Listen for settings changes to update icon
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    updateIcon();
  }
});

// Initialize icon on startup
updateIcon();

console.log('APS Archive Branding POC - Background service worker loaded');
