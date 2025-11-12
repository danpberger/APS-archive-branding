# APS Archive Branding CSS - Implementation Guide

This guide shows you how to test and implement the APS branding CSS for the archive.aps.org site.

---

## Quick Test: Browser Inspector Method

This method lets you preview the styling immediately without any file changes.

### Method 1: Direct CSS Injection (Easiest)

1. **Open archive.aps.org** in your browser (Chrome, Firefox, Safari, or Edge)

2. **Open Developer Tools:**
   - **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - **Firefox:** Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - **Safari:** Enable Developer menu first (Safari → Preferences → Advanced → Show Develop menu), then press `Cmd+Option+I`

3. **Go to the Console tab** (click "Console" in the developer tools)

4. **Copy and paste this code** into the console and press Enter:

```javascript
// Load the APS branding CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://raw.githubusercontent.com/[YOUR-REPO]/kumhio/main/archive-branding.css';
document.head.appendChild(link);
```

**Note:** You'll need to host the CSS file somewhere accessible (GitHub Pages, CDN, etc.) for this method to work.

---

### Method 2: Local File Injection (For Testing)

This method uses the local CSS file directly.

1. **Open archive.aps.org** in your browser

2. **Open Developer Tools** (same as above)

3. **Go to the Console tab**

4. **Copy the entire contents** of `archive-branding.css` file

5. **Paste this code** into the console (replace `CSS_CONTENT_HERE` with the actual CSS):

```javascript
// Inject CSS directly
const style = document.createElement('style');
style.textContent = `
/* PASTE THE ENTIRE archive-branding.css CONTENT HERE */
`;
document.head.appendChild(style);
```

**Tip:** This will only work for the current page session. Refresh and it's gone.

---

### Method 3: Override in Network Tab (Advanced)

For persistent testing across page loads:

1. **Use a browser extension** like:
   - **Stylus** (Chrome/Firefox/Edge): https://add0n.com/stylus.html
   - **User CSS** (Safari)
   - **Live CSS Editor** (Chrome)

2. **Install the extension**

3. **Add a new style** for `archive.aps.org`

4. **Paste the contents** of `archive-branding.css`

5. **Save and enable** the style

Now the styling will persist across page loads and navigation!

---

## Permanent Implementation: Astro Integration

To permanently add the branding to the archive site:

### Step 1: Add CSS to Your Astro Project

Place the CSS file in your Astro project:

```bash
# Assuming you're in the Astro project root
mkdir -p public/styles
cp archive-branding.css public/styles/
```

**Or** place it in your source directory for processing:

```bash
mkdir -p src/styles
cp archive-branding.css src/styles/
```

### Step 2: Link the CSS in Your Layout

**Option A: If using a base layout file** (e.g., `src/layouts/BaseLayout.astro`):

```astro
---
// src/layouts/BaseLayout.astro
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Astro.props.title}</title>

    <!-- Add the branding CSS -->
    <link rel="stylesheet" href="/styles/archive-branding.css">
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Option B: If using Astro's built-in styling** (recommended):

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/archive-branding.css';
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Astro.props.title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Option C: Global import in main layout**:

Add to `src/pages/_app.astro` or your main layout:

```astro
---
import '../styles/archive-branding.css';
---
```

### Step 3: Build and Preview

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Step 4: Verify Styling

Visit these pages to verify the styling:

- **Homepage:** `http://localhost:4321/` (or your dev server URL)
- **Series page:** `http://localhost:4321/mar/`
- **Meeting page:** `http://localhost:4321/mar/2023/`
- **Session page:** `http://localhost:4321/mar/2023/a44/`
- **Abstract page:** `http://localhost:4321/mar/2023/a44/1/`

---

## Advanced: Astro Configuration (Optional)

If you want more control over CSS processing:

### Option 1: Add to `astro.config.mjs`

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        // Add any CSS preprocessing options here
      }
    }
  }
});
```

### Option 2: Use Astro's `<style is:global>` (Per-Page)

If you only want styling on specific pages:

```astro
---
// src/pages/index.astro
---
<style is:global>
  @import '../styles/archive-branding.css';
</style>

<!-- Your page content -->
```

### Option 3: Inline Critical CSS

For performance optimization:

```astro
---
// src/layouts/BaseLayout.astro
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <style is:inline>
      /* Critical CSS here - fonts, colors, layout basics */
      @import url('https://fonts.googleapis.com/css2?family=Jost:wght@100..900&display=swap');
      :root {
        --aps-primary-600: #00538b;
        --aps-neutral-900: #1d1e27;
      }
      body {
        font-family: 'Jost', sans-serif;
        color: var(--aps-neutral-900);
      }
    </style>

    <!-- Non-critical CSS loaded asynchronously -->
    <link rel="stylesheet" href="/styles/archive-branding.css" media="print" onload="this.media='all'">
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## Testing Checklist

After implementing, verify these elements:

### Visual Design
- [ ] **Font:** Text uses Jost font family
- [ ] **Colors:** Primary blue (#00538b) appears on headings and links
- [ ] **Spacing:** Proper padding and margins throughout
- [ ] **Logo:** APS logo displays correctly in header

### Layout
- [ ] **Header:** Sticky header with logo and title
- [ ] **Breadcrumbs:** Gray background bar with link separators
- [ ] **Main content:** Centered container with max-width
- [ ] **Responsive:** Layout adapts on mobile/tablet/desktop

### Interactive Elements
- [ ] **Links:** Blue color, underline on hover
- [ ] **Cards:** Border color changes on hover (conference/year lists)
- [ ] **Focus states:** Keyboard navigation shows outlines
- [ ] **Session cards:** Hover effect with shadow

### Content Types
- [ ] **Homepage:** Conference series grid
- [ ] **Series page:** Year listing
- [ ] **Meeting page:** Session cards with metadata
- [ ] **Session page:** Presentation list with styled sections
- [ ] **Abstract page:** Formatted abstract with author list

### Accessibility
- [ ] **Keyboard navigation:** Tab through links
- [ ] **Focus indicators:** Visible focus outlines
- [ ] **Color contrast:** Text readable against backgrounds
- [ ] **Screen reader:** Test with screen reader if possible

---

## Customization

### Changing Colors

Edit the CSS custom properties in `archive-branding.css`:

```css
:root {
  /* Change primary brand color */
  --aps-primary-600: #00538b;  /* Replace with your color */

  /* Change secondary/teal color */
  --aps-secondary-400: #00b48d;  /* Replace with your color */

  /* Change text color */
  --aps-neutral-900: #1d1e27;  /* Replace with your color */
}
```

### Adjusting Typography

```css
:root {
  /* Change font weight */
  --aps-font-default: 350;  /* Body text weight (100-900) */
  --aps-font-heading: 600;  /* Heading weight */

  /* Change base font size */
  --aps-text-base: clamp(1rem, 0.2841vw + 0.9432rem, 1.125rem);
}
```

### Adjusting Spacing

```css
:root {
  /* Change spacing scale */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
}
```

---

## Troubleshooting

### CSS Not Loading

**Problem:** Styles don't appear after adding the CSS file.

**Solutions:**
1. Check the file path in your `<link>` tag
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for 404 errors
4. Verify CSS file is in `public/` directory (not `src/`)

### Font Not Loading

**Problem:** Jost font doesn't load, falls back to system font.

**Solutions:**
1. Check internet connection (Google Fonts requires internet)
2. Download Jost font locally and use `@font-face`:

```css
@font-face {
  font-family: 'Jost';
  src: url('/fonts/Jost-VariableFont.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}
```

3. Use a fallback system font stack:

```css
body {
  font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Styles Conflict with Existing CSS

**Problem:** Some styles don't apply or look wrong.

**Solutions:**
1. Increase specificity in `archive-branding.css`
2. Use `!important` sparingly for critical overrides
3. Load `archive-branding.css` AFTER any existing stylesheets
4. Check browser DevTools to see which styles are being overridden

### Performance Issues

**Problem:** Page loads slowly with the new CSS.

**Solutions:**
1. Use font `preload` in HTML head:

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Jost:wght@100..900&display=swap" as="style">
```

2. Minify CSS for production:

```bash
# Using a tool like cssnano
npx cssnano archive-branding.css archive-branding.min.css
```

3. Enable Astro's CSS optimization:

```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
  },
});
```

---

## Browser Support

This CSS is designed to work on:

- **Chrome/Edge:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Mobile browsers:** iOS Safari 14+, Chrome Mobile 90+

### Features Used:
- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- `clamp()` for fluid typography
- Modern pseudo-classes (`:has()`, `:is()`, `:where()`)

**Note:** If you need to support older browsers, you may need to:
1. Remove or polyfill `:has()` selector (not supported in Firefox <103)
2. Provide fallback values for `clamp()`
3. Add vendor prefixes for older WebKit/Blink

---

## What's Next?

### Optional Enhancements

1. **Add JavaScript for interactive features** (see `archive-enhancements.js` - to be created)
2. **Enable dark mode** (uncomment dark mode section in CSS)
3. **Add search functionality** (requires custom implementation)
4. **Implement filters** for sessions by date/topic
5. **Add print stylesheets** (already included, but can enhance)

### Production Considerations

1. **CDN Hosting:** Host CSS on CDN for faster loading
2. **CSS Splitting:** Split into critical and non-critical CSS
3. **Compression:** Enable gzip/brotli compression
4. **Caching:** Set appropriate cache headers
5. **Monitoring:** Check CSS file size and load times

---

## Contact & Support

For questions or issues with this CSS implementation:

- **Project Repository:** [Your GitHub repo]
- **APS Contact:** Miyoung Mary Kim (mkim@aps.org)
- **Documentation:** See `CLAUDE.md` for project context

---

## Changelog

### Version 1.0.0 (2025-11-11)
- Initial release
- Full APS branding implementation
- Responsive design for all page types
- Accessibility enhancements
- Print stylesheet
- Browser inspector testing instructions
- Astro integration guide
