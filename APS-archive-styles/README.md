# APS Archive Branding - Chrome Extension

A Chrome extension that applies APS branding styles to archive.aps.org for preview and testing purposes.

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/danpberger/APS-archive-branding.git
cd APS-archive-branding/APS-archive-styles
```

### 2. Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `chrome-extension/` folder
5. The extension icon will appear in your toolbar

### 3. Test It

1. Visit [archive.aps.org](https://archive.aps.org)
2. Click the extension icon in your toolbar
3. Ensure all toggles are enabled
4. Click **Apply & Refresh**

The site should now display with APS branding applied.

## What's Included

```
APS-archive-styles/
├── chrome-extension/          # Chrome extension (load this folder)
│   ├── manifest.json          # Extension configuration
│   ├── archive-branding.css   # APS branding styles
│   ├── archive-enhancements.js # Interactive features
│   ├── popup.html/js          # Extension popup UI
│   ├── content.js             # Content script injector
│   ├── background.js          # Service worker
│   ├── icons/                 # Extension icons
│   └── README.md              # Detailed extension docs
├── archive-branding.css       # Standalone CSS file
├── archive-enhancements.js    # Standalone JS file
├── bookmarklet.js             # Alternative: bookmarklet version
└── *.md                       # Documentation files
```

## Extension Features

### CSS Branding (~24KB)
- Jost variable font (APS brand font)
- APS color palette (primary blue #00538b)
- Responsive card-based layout
- Hover animations and transitions
- Sticky header navigation
- Breadcrumb styling
- Session and abstract page layouts

### JavaScript Enhancements (~8KB)
- Back-to-top button
- Print button
- Session filter (for pages with 10+ sessions)
- External link indicators
- Keyboard navigation support

## Toggle Options

The extension popup provides granular control:

| Toggle | Description |
|--------|-------------|
| **Enable Styling** | Master on/off switch |
| **CSS Branding** | Visual styles only |
| **JS Enhancements** | Interactive features |

## Documentation

- **[Chrome Extension Setup](chrome-extension/README.md)** - Detailed installation and usage guide
- **[Quick Start Guide](CHROME-EXTENSION.md)** - 5-minute setup instructions
- **[CSS Documentation](README-CSS-BRANDING.md)** - CSS architecture and customization
- **[Testing Guide](QUICK-TEST.md)** - What to test and look for

## Development

### Modifying Styles

1. Edit `chrome-extension/archive-branding.css`
2. Save the file
3. Refresh the archive.aps.org page (no extension reload needed)

### Modifying JavaScript

1. Edit `chrome-extension/archive-enhancements.js`
2. Save the file
3. Refresh the archive.aps.org page

### Modifying Extension Code

1. Edit the relevant file (manifest.json, popup.js, etc.)
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Refresh archive.aps.org

## Browser Support

- Chrome (primary, fully tested)
- Edge (Chromium-based, should work)
- Other Chromium browsers (untested)

## Privacy & Security

This extension:
- Only runs on `archive.aps.org`
- Does not collect any data
- Does not send data to external servers
- Stores preferences locally only
- Uses minimal permissions

## Project Info

**Project:** Kumhio - APS Meeting Archive
**Organization:** American Physical Society
**Status:** Proof of Concept / Internal Testing

---

For issues or questions, see the [Chrome Extension README](chrome-extension/README.md) troubleshooting section.
