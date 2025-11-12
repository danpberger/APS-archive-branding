/**
 * APS Archive Branding - Bookmarklet Version
 *
 * Instructions:
 * 1. Create a new bookmark in your browser
 * 2. Name it "APS Style"
 * 3. Copy the MINIFIED version below and paste as the URL
 * 4. Visit archive.aps.org and click the bookmark
 *
 * This loads the CSS from a hosted location (you'll need to host it)
 */

// FULL VERSION (for understanding):
javascript:(function() {
  // Option 1: Load from hosted CSS file
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://YOUR-DOMAIN.com/archive-branding.css';
  document.head.appendChild(link);

  // Show confirmation
  const notice = document.createElement('div');
  notice.textContent = '✓ APS Branding Applied';
  notice.style.cssText = 'position:fixed;top:20px;right:20px;background:#00538b;color:white;padding:12px 20px;border-radius:8px;z-index:9999;font-family:sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.3);animation:slideIn 0.3s ease;';
  document.body.appendChild(notice);

  // Add animation
  const style = document.createElement('style');
  style.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}';
  document.head.appendChild(style);

  // Remove notice after 3 seconds
  setTimeout(() => {
    notice.style.transition = 'opacity 0.3s ease';
    notice.style.opacity = '0';
    setTimeout(() => notice.remove(), 300);
  }, 3000);

  console.log('✓ APS Archive branding loaded!');
})();

// MINIFIED VERSION (copy this for bookmarklet):
// javascript:(function(){const l=document.createElement('link');l.rel='stylesheet';l.href='https://YOUR-DOMAIN.com/archive-branding.css';document.head.appendChild(l);const n=document.createElement('div');n.textContent='✓ APS Branding Applied';n.style.cssText='position:fixed;top:20px;right:20px;background:#00538b;color:white;padding:12px 20px;border-radius:8px;z-index:9999;font-family:sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.3)';document.body.appendChild(n);setTimeout(()=>n.remove(),3000);})();

/**
 * LOCAL TESTING VERSION
 * Use this if you want to embed the CSS directly (no external hosting)
 * WARNING: This will be VERY long. Better to host the CSS file.
 */

// javascript:(function(){const s=document.createElement('style');s.textContent=`/* PASTE ENTIRE CSS HERE */`;document.head.appendChild(s);alert('Styled!');})();

/**
 * GITHUB PAGES HOSTING EXAMPLE
 * If you push this to GitHub and enable GitHub Pages:
 */

// javascript:(function(){const l=document.createElement('link');l.rel='stylesheet';l.href='https://YOUR-USERNAME.github.io/kumhio/archive-branding.css';document.head.appendChild(l);console.log('Styled via GitHub Pages');})();

/**
 * JSDELIVR CDN EXAMPLE
 * If you use jsDelivr to serve from GitHub:
 */

// javascript:(function(){const l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/gh/YOUR-USERNAME/kumhio@main/archive-branding.css';document.head.appendChild(l);console.log('Styled via jsDelivr CDN');})();

/**
 * OPTION: Load CSS + JavaScript
 * This version also loads the enhancement script
 */

// javascript:(function(){const l=document.createElement('link');l.rel='stylesheet';l.href='https://YOUR-DOMAIN.com/archive-branding.css';document.head.appendChild(l);const s=document.createElement('script');s.src='https://YOUR-DOMAIN.com/archive-enhancements.js';document.head.appendChild(s);console.log('✓ CSS + JS loaded');})();
