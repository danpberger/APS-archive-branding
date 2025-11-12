# Quick Test Guide

## Reload and Test (3 steps)

### 1. Reload Extension
```
chrome://extensions/
```
Find "APS Archive Branding POC" → Click refresh icon 🔄

### 2. Click Extension Icon
Click the APS icon in Chrome toolbar

### 3. Expected Result
You should see:
- 320px wide popup window
- Blue header "APS Archive Branding"
- Three toggle switches
- Two buttons (Apply & Refresh, Reset)

## If Popup Still Doesn't Appear

### Check Console
1. Right-click extension icon → "Inspect popup"
2. Look for these logs:
   ```
   popup.js loaded
   Starting popup...
   Popup init() starting...
   DOM elements verified
   Settings loaded: {enabled: true, ...}
   ```

### If You See Errors
Look for error messages like:
- "Required DOM elements not found: [list]" → HTML/ID mismatch
- "Cannot read property of undefined" → Chrome API issue
- CSP violation → Inline script detected

## Test with Debug Popup

If main popup fails, test with simplified version:

1. Edit manifest.json line 14:
   ```json
   "default_popup": "popup-debug.html",
   ```

2. Reload extension

3. Click icon

4. Should see green "Debug: Popup is Loading!" message

5. If debug popup works, issue is in popup.js logic

6. If debug popup fails, issue is with Chrome extension setup

## Console Commands for Debugging

Open popup inspector and run:

```javascript
// Check if DOM elements exist
document.getElementById('enabledToggle')
document.getElementById('cssToggle')
document.getElementById('jsToggle')
document.getElementById('refreshBtn')
document.getElementById('resetBtn')
document.getElementById('status')

// Check Chrome API
chrome.storage.sync.get(['enabled'], (r) => console.log(r))

// Check document state
console.log(document.readyState)
```

## File Paths
- Main popup: `/Users/berger/Code Projects/kumhio/APS-archive-styles/chrome-extension/popup.html`
- Debug popup: `/Users/berger/Code Projects/kumhio/APS-archive-styles/chrome-extension/popup-debug.html`
- Manifest: `/Users/berger/Code Projects/kumhio/APS-archive-styles/chrome-extension/manifest.json`
