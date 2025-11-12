# Popup Not Appearing - Diagnostic Guide

## ✅ CSS Z-Index Issue: FIXED
The sticky header issue on abstract pages has been resolved.

## 🔍 Popup Issue - Diagnostic Steps

### Step 1: Check if Popup is Blocked

**Chrome might be blocking the popup in several ways:**

1. **Pop-up Blocker (unlikely for extensions, but check):**
   - Go to `chrome://settings/content/popups`
   - Make sure pop-ups aren't blocked globally

2. **Extension Icon Location:**
   - Click the puzzle piece icon in Chrome toolbar
   - Find "APS Archive Branding POC"
   - Click the pin icon to pin it to toolbar
   - Try clicking the pinned icon

### Step 2: Test Popup Directly

**Open popup.html directly in browser:**

1. Go to `chrome://extensions/`
2. Find "APS Archive Branding POC"
3. Look for the extension ID (something like: `abcdefghijklmnopqrstuvwxyz123456`)
4. Copy the ID
5. Open a new tab and go to:
   ```
   chrome-extension://[YOUR-EXTENSION-ID]/popup.html
   ```
   Replace `[YOUR-EXTENSION-ID]` with the actual ID

**Expected result:** The popup UI should display in the tab

If it shows there but not when clicking icon, there's a popup blocker issue.

### Step 3: Check Extension Errors

1. Go to `chrome://extensions/`
2. Find "APS Archive Branding POC"
3. Look for an **"Errors"** button (red text)
4. Click it if present to see any errors

### Step 4: Inspect the Popup

1. **Right-click** the extension icon
2. Select **"Inspect popup"** from menu
3. This opens DevTools for the popup
4. Check:
   - **Console tab:** Look for errors
   - **Elements tab:** Verify HTML is loaded
   - **Network tab:** Check if popup.css and popup.js loaded

### Step 5: Check Console Logs

When you click "Inspect popup", you should see console messages:
```
popup.js loaded
Starting popup...
Popup init() starting...
DOM elements verified
Settings loaded: {enabled: true, injectCSS: true, injectJS: true}
```

If you see errors instead, that's the issue.

### Step 6: Verify Files Exist

Run this in terminal:
```bash
ls -la /Users/berger/Code\ Projects/kumhio/APS-archive-styles/chrome-extension/ | grep -E "popup\.(html|js|css)"
```

Should show:
- popup.html
- popup.js
- popup.css

### Step 7: Alternative Test - Use Popup Debug Version

I created a minimal test popup. Update manifest.json temporarily:

1. Open `manifest.json`
2. Change line 14 from:
   ```json
   "default_popup": "popup.html",
   ```
   to:
   ```json
   "default_popup": "popup-debug.html",
   ```
3. Save and reload extension
4. Click icon - if debug popup appears, issue is with main popup.html

## Common Issues & Solutions

### Issue: Icon appears but nothing happens when clicked

**Possible causes:**
1. Pop-up blocker (rare for extensions)
2. manifest.json not pointing to correct popup file
3. popup.html has errors
4. Chrome extension system issue

**Solutions:**
1. Try opening popup URL directly (Step 2)
2. Check for extension errors (Step 3)
3. Inspect popup (Step 4)
4. Reload extension completely:
   - Click "Remove" in chrome://extensions/
   - Re-load the extension folder

### Issue: "Inspect popup" option not available

**This means Chrome isn't recognizing popup.html**

**Solutions:**
1. Check manifest.json has correct `"default_popup": "popup.html"`
2. Verify popup.html exists in extension root folder
3. Reload extension

### Issue: Popup appears blank

**JavaScript or CSS failed to load**

**Solutions:**
1. Check DevTools Console for errors
2. Verify popup.js and popup.css exist
3. Check for CSP (Content Security Policy) errors

### Issue: Popup shows error message

**Good! At least popup is working, just has an error**

**Solution:**
- Read the error message
- It will tell you which DOM element failed to load
- Check popup.html has all required IDs

## Quick Reload Steps

1. Go to `chrome://extensions/`
2. Find "APS Archive Branding POC"
3. Click refresh icon (circular arrow)
4. Go to archive.aps.org
5. Click extension icon

## Nuclear Option: Complete Reinstall

If nothing works:

1. Go to `chrome://extensions/`
2. Click "Remove" on the extension
3. Restart Chrome completely (quit and reopen)
4. Go back to `chrome://extensions/`
5. Enable Developer mode
6. Click "Load unpacked"
7. Select the chrome-extension folder again

## Report Back

When testing, please note:

1. **What happens when you click the icon?**
   - Nothing at all?
   - Blank popup?
   - Error message?
   - Popup flashes and disappears?

2. **Can you right-click and see "Inspect popup"?**
   - Yes/No

3. **When you inspect popup, what's in the Console?**
   - Copy any error messages

4. **Can you access popup.html directly via chrome-extension:// URL?**
   - Yes/No

This will help us identify the exact issue!
