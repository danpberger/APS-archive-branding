console.log('popup-debug.js loaded successfully!');

// Show current time
document.getElementById('time').textContent = new Date().toLocaleTimeString();

// Test Chrome API
const statusEl = document.getElementById('status');

try {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    statusEl.textContent = '✓ Chrome API available';
    statusEl.style.color = 'green';

    // Try to read storage
    chrome.storage.sync.get(['enabled'], (result) => {
      console.log('Storage read result:', result);
      statusEl.textContent += ' | Storage accessible';
    });
  } else {
    statusEl.textContent = '✗ Chrome API not available';
    statusEl.style.color = 'red';
  }
} catch (error) {
  statusEl.textContent = '✗ Error: ' + error.message;
  statusEl.style.color = 'red';
  console.error('Popup error:', error);
}
