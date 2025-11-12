# Chrome Extension Quick Start

**🎯 Goal:** Load a local Chrome extension that automatically injects APS branding CSS/JS into archive.aps.org

---

## ⚡ 5-Minute Setup

### Step 1: Generate Icons (Optional - 1 minute)

1. Open `chrome-extension/icons/generate-icons.html` in Chrome
2. Click "Generate & Download Icons"
3. Move downloaded PNG files to `chrome-extension/icons/` folder

**Or skip this** - extension works fine without custom icons!

---

### Step 2: Load Extension (2 minutes)

1. **Open Chrome Extensions:**
   - Navigate to `chrome://extensions/`
   - Or: Chrome Menu → Extensions → Manage Extensions

2. **Enable Developer Mode:**
   - Toggle switch in top-right corner

3. **Load Extension:**
   - Click "Load unpacked" button
   - Navigate to: `APS-archive-styles/chrome-extension/`
   - Click "Select Folder"

4. **Verify:**
   - Extension appears in list as "APS Archive Branding POC v1.0.0"
   - Icon appears in toolbar (or click puzzle icon to pin it)

---

### Step 3: Test It (2 minutes)

1. **Visit:** https://archive.aps.org
2. **Click** the extension icon in toolbar
3. **Verify** all toggles are enabled:
   - ✅ Enable Styling
   - ✅ CSS Branding
   - ✅ JS Enhancements
4. **Click** "Apply & Refresh" button
5. **See** the styled page! 🎉

---

## 🎮 Using the Extension

### Popup Controls

| Toggle | What It Does |
|--------|-------------|
| **Enable Styling** | Master on/off switch |
| **CSS Branding** | Typography, colors, layout (24KB) |
| **JS Enhancements** | Interactive features: back-to-top, filters, print button (8KB) |

### Typical Configurations

**Full POC (Recommended)**
```
✅ Enable Styling
✅ CSS Branding
✅ JS Enhancements
```

**CSS Only**
```
✅ Enable Styling
✅ CSS Branding
❌ JS Enhancements
```

**Disable Everything**
```
❌ Enable Styling
```

---

## ✅ What to Test

Visit these pages on archive.aps.org:

- [ ] Homepage (`/`) - Grid of conference series
- [ ] Series page (`/mar`) - List of years
- [ ] Meeting page (`/mar/2023`) - Session cards
- [ ] Session page (`/mar/2023/a44/`) - Presentation list
- [ ] Abstract page (`/mar/2023/a44/1/`) - Full abstract

**Look for:**
- Jost font
- APS blue color scheme (#00538b)
- Hover effects on cards
- Sticky header
- Responsive layout
- Back-to-top button (bottom-right)
- Print button (bottom-left)

---

## 🔧 Troubleshooting

**Extension not working?**
1. Check `chrome://extensions/` - is it enabled?
2. Click extension icon - are toggles ON?
3. Try "Apply & Refresh" button
4. Hard refresh page (Ctrl+Shift+R)

**Styles not applying?**
1. Open DevTools (F12)
2. Check Console tab for errors
3. Look for green checkmarks:
   - "✓ APS Archive CSS injected"
   - "✓ APS Archive JS injected"

**Settings not saving?**
- Chrome sync might be disabled
- Check Chrome settings → Sync

---

## 📝 Making Changes

### Edit CSS Styles
1. Edit `chrome-extension/archive-branding.css`
2. Save file
3. Refresh archive.aps.org page (no extension reload needed!)

### Edit JavaScript
1. Edit `chrome-extension/archive-enhancements.js`
2. Save file
3. Refresh archive.aps.org page

### Edit Extension Code (manifest, popup, etc.)
1. Make changes
2. Go to `chrome://extensions/`
3. Click refresh icon on extension card
4. Refresh archive.aps.org page

---

## 🗑️ Uninstall

1. Go to `chrome://extensions/`
2. Find "APS Archive Branding POC"
3. Click "Remove"

---

## 📚 Full Documentation

See `chrome-extension/README.md` for:
- Complete installation guide
- File structure explanation
- Development tips
- Privacy & security info
- Known issues
- Version history

---

## 🎯 Extension Files Created

```
chrome-extension/
├── manifest.json              # Extension config
├── popup.html + popup.js      # UI controls
├── content.js                 # Injection logic
├── background.js              # Service worker
├── archive-branding.css       # APS styles
├── archive-enhancements.js    # JS features
├── icons/                     # Extension icons
│   ├── generate-icons.html
│   ├── icon.svg
│   └── README.md
└── README.md                  # Full docs
```

---

## 💡 Pro Tips

1. **Pin extension to toolbar** - Click puzzle icon, then pin
2. **Keep extension enabled** - No overhead when not on archive.aps.org
3. **Use DevTools** to see injection logs
4. **Test CSS-only mode** for lightweight preview
5. **Take screenshots** for documentation

---

## ✨ Features

**CSS Branding (24KB):**
- Jost variable font
- APS color palette
- Responsive layout
- Hover animations
- Sticky header
- Breadcrumb navigation
- Card-based design

**JS Enhancements (8KB):**
- Back to top button
- Print button
- Session filter (10+ sessions)
- Table of contents (4+ sections)
- External link indicators
- Keyboard navigation
- Loading indicators

---

**Ready to go? Load the extension and visit archive.aps.org!**

See `chrome-extension/README.md` for complete documentation.
