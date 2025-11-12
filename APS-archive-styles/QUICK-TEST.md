# Quick Test: Browser Inspector Method

## Fastest Way to Test the CSS (Copy & Paste)

1. **Open https://archive.aps.org in your browser**

2. **Open Developer Console:**
   - Mac: `Cmd + Option + I`
   - Windows/Linux: `Ctrl + Shift + I`
   - Or right-click anywhere → "Inspect"

3. **Click the "Console" tab**

4. **Copy and paste this entire code block**, then press Enter:

```javascript
// Quick CSS injection for testing
(function() {
  const css = `
/* Paste the entire contents of archive-branding.css here */
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  console.log('✓ APS Branding CSS applied! Refresh page to remove.');
})();
```

**Note:** Replace the comment with the actual CSS from `archive-branding.css`

---

## Even Faster: Bookmarklet Method

### One-Time Setup:

1. **Create a new bookmark** in your browser
2. **Name it:** "APS Branding"
3. **For the URL, paste this:**

```javascript
javascript:(function(){const s=document.createElement('style');s.textContent=`/* CSS HERE */`;document.head.appendChild(s);console.log('✓ Styled!');})();
```

Replace `/* CSS HERE */` with the minified CSS.

4. **Save the bookmark**

### To Use:
- Visit archive.aps.org
- Click the bookmark
- Instant styling!

---

## Browser Extension Method (Recommended for Persistent Testing)

### Chrome/Edge: Stylus Extension

1. Install: https://chrome.google.com/webstore/detail/stylus/
2. Click Stylus icon → "Manage"
3. Click "Write new style"
4. Set "Applies to: URLs on the domain" → `archive.aps.org`
5. Paste CSS from `archive-branding.css`
6. Save

### Firefox: Stylus Extension

1. Install: https://addons.mozilla.org/en-US/firefox/addon/styl-us/
2. Same steps as Chrome

### Safari: Userscripts Extension

1. Install Userscripts from App Store
2. Add new style for `archive.aps.org`
3. Paste CSS

---

## Test These Pages:

1. **Homepage:** https://archive.aps.org
   - ✓ Logo and title styled
   - ✓ Conference grid layout

2. **Series (e.g., MAR):** https://archive.aps.org/mar
   - ✓ Breadcrumbs visible
   - ✓ Year list styled

3. **Meeting Year:** https://archive.aps.org/mar/2023
   - ✓ Session cards with hover
   - ✓ Metadata badges

4. **Session:** https://archive.aps.org/mar/2023/a44/
   - ✓ Presentation list
   - ✓ Section headings

5. **Abstract:** https://archive.aps.org/mar/2023/a44/1/
   - ✓ Abstract formatting
   - ✓ Author list

---

## Quick Visual Checklist:

After applying the CSS, you should see:

- [ ] **Blue header** with APS logo
- [ ] **Gray breadcrumb bar** (on non-homepage)
- [ ] **Jost font** throughout
- [ ] **Blue links** (#00538b)
- [ ] **Card layouts** for conference/year lists
- [ ] **Hover effects** on cards and links
- [ ] **Proper spacing** and white space
- [ ] **Responsive layout** on mobile (resize window)

---

## Remove the Styling:

- **Refresh the page** (F5 or Cmd+R)
- Or run: `location.reload()`

---

## Optional: Add JavaScript Enhancements

After applying CSS, paste this for extra features:

```javascript
// Load JavaScript enhancements
const script = document.createElement('script');
script.src = 'path/to/archive-enhancements.js';
document.head.appendChild(script);
```

This adds:
- Back to top button
- Session filter (on pages with 10+ sessions)
- Print button
- Keyboard navigation improvements

---

## Troubleshooting:

**Fonts don't load?**
- Check internet connection (Google Fonts CDN)
- Wait a few seconds after applying CSS

**Styles look broken?**
- Clear cache: Ctrl+Shift+Delete (Chrome) or Cmd+Shift+Delete (Safari)
- Try in Incognito/Private mode

**Console errors?**
- Check that you pasted the entire CSS
- Look for syntax errors in pasted code

---

## Next Steps:

Once you're happy with the styling:
1. See `BRANDING-INSTRUCTIONS.md` for Astro integration
2. Customize colors/fonts as needed
3. Deploy to production!
