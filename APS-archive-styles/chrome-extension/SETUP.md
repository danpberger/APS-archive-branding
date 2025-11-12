# 🚨 REQUIRED: Icon Setup

The Chrome extension requires icon files to load. Follow these steps:

## Quick Fix (2 minutes)

### Step 1: Generate Icons

1. **Open** `create-icons.html` in Chrome
   - Double-click the file, or
   - Drag it into Chrome browser

2. **Click** the blue "Generate & Download All Icons" button

3. **Save all 3 files** when prompted:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

### Step 2: Move Icons to Correct Location

Move the 3 downloaded PNG files to:
```
chrome-extension/icons/
```

So you should have:
```
chrome-extension/icons/icon16.png
chrome-extension/icons/icon48.png
chrome-extension/icons/icon128.png
```

### Step 3: Load Extension

Now you can load the extension:

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `chrome-extension/` folder
5. ✅ Extension should load successfully!

---

## Already Have Icons?

If you have your own PNG icons (16x16, 48x48, 128x128), just:

1. Name them: `icon16.png`, `icon48.png`, `icon128.png`
2. Place them in `chrome-extension/icons/`
3. Load the extension

---

## Still Having Issues?

**Error: "Could not load icon"**
- Make sure all 3 PNG files are in `chrome-extension/icons/`
- Check file names are exactly: `icon16.png`, `icon48.png`, `icon128.png`
- No spaces, no capital letters in filenames

**Icons didn't download?**
- Try opening `create-icons.html` in a different browser
- Check your Downloads folder
- Make sure pop-ups aren't blocked

**Can't find downloaded files?**
- Check your default Downloads folder
- Look for three PNG files starting with "icon"

---

## What These Files Do

- `icon16.png` - Shows in browser toolbar
- `icon48.png` - Shows in Chrome extensions page
- `icon128.png` - Used in Chrome Web Store (future)

---

**After setup, see `INSTALLATION.txt` or `README.md` for usage instructions.**
