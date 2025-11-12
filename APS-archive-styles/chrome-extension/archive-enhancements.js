/**
 * APS Archive Branding - Optional JavaScript Enhancements
 * Version: 1.0.0
 *
 * This file provides minimal, progressive enhancements that degrade gracefully.
 * The site remains fully functional without JavaScript.
 *
 * Features:
 * - Smooth scroll to top
 * - Session filtering by date/time
 * - Keyboard navigation improvements
 * - Loading state indicators
 */

(function() {
  'use strict';

  // Check if JavaScript is enabled
  document.documentElement.classList.add('js-enabled');

  /**
   * Utility: Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Enhancement 1: Add "Back to Top" button
   */
  function addBackToTop() {
    // Create button
    const button = document.createElement('button');
    button.textContent = '↑ Top';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background-color: var(--aps-primary-600, #00538b);
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 83, 139, 0.3);
    `;

    document.body.appendChild(button);

    // Show/hide based on scroll position
    const toggleButton = debounce(() => {
      if (window.scrollY > 300) {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
      } else {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
      }
    }, 100);

    window.addEventListener('scroll', toggleButton);

    // Smooth scroll to top
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  }

  /**
   * Enhancement 2: Add loading indicator for slow connections
   */
  function addLoadingIndicator() {
    // Only add if page is still loading
    if (document.readyState !== 'complete') {
      const loader = document.createElement('div');
      loader.className = 'page-loader';
      loader.setAttribute('aria-live', 'polite');
      loader.setAttribute('aria-busy', 'true');
      loader.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            var(--aps-primary-600, #00538b) 0%,
            var(--aps-secondary-400, #00b48d) 50%,
            var(--aps-primary-600, #00538b) 100%);
          z-index: 9999;
          animation: loading-bar 1.5s ease-in-out infinite;
        "></div>
      `;

      // Add animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(loader);

      // Remove on load
      window.addEventListener('load', () => {
        loader.style.transition = 'opacity 0.3s ease';
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
      });
    }
  }

  /**
   * Enhancement 3: Improve link navigation (external link indicators)
   */
  function enhanceLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      // Skip if link is to same domain
      if (link.hostname === window.location.hostname) return;

      // Add external link indicator
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');

      // Add visual indicator
      const indicator = document.createElement('span');
      indicator.textContent = ' ↗';
      indicator.style.fontSize = '0.85em';
      indicator.setAttribute('aria-label', '(opens in new window)');

      // Only add if not already present
      if (!link.querySelector('span[aria-label*="opens in new window"]')) {
        link.appendChild(indicator);
      }
    });
  }

  /**
   * Enhancement 4: Add keyboard navigation helper
   */
  function enhanceKeyboardNav() {
    let isKeyboardUser = false;

    // Detect keyboard usage
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isKeyboardUser = true;
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      isKeyboardUser = false;
      document.body.classList.remove('keyboard-nav');
    });

    // Add focus styles for keyboard users
    const style = document.createElement('style');
    style.textContent = `
      body:not(.keyboard-nav) *:focus {
        outline: none;
      }

      body.keyboard-nav *:focus {
        outline: 2px solid var(--aps-primary-400, #6093b9);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Enhancement 5: Add session filter (for meeting pages with many sessions)
   */
  function addSessionFilter() {
    const main = document.querySelector('main');
    const sections = main?.querySelectorAll('section');

    // Only add filter if there are 10+ sessions
    if (!sections || sections.length < 10) return;

    const filterContainer = document.createElement('div');
    filterContainer.className = 'session-filter';
    filterContainer.style.cssText = `
      background-color: var(--aps-neutral-100, #f2f2f2);
      padding: 1rem;
      margin-bottom: 2rem;
      border-radius: 0.375rem;
      border: 1px solid var(--aps-neutral-200, #d0d0d0);
    `;

    filterContainer.innerHTML = `
      <label for="session-search" style="
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--aps-primary-600, #00538b);
      ">Filter sessions:</label>
      <input
        type="text"
        id="session-search"
        placeholder="Search by title, time, or room..."
        style="
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--aps-neutral-300, #aeaeaf);
          border-radius: 0.25rem;
          font-size: 1rem;
          font-family: inherit;
        "
      >
      <div id="filter-count" style="
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--aps-neutral-600, #49494a);
      "></div>
    `;

    // Insert at the top of main content
    const firstChild = main.querySelector('h1')?.nextSibling || main.firstChild;
    main.insertBefore(filterContainer, firstChild.nextSibling);

    const searchInput = filterContainer.querySelector('#session-search');
    const countDisplay = filterContainer.querySelector('#filter-count');

    // Filter function
    const filterSessions = debounce(() => {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        const isVisible = !query || text.includes(query);

        section.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
      });

      // Update count
      if (query) {
        countDisplay.textContent = `Showing ${visibleCount} of ${sections.length} sessions`;
      } else {
        countDisplay.textContent = `${sections.length} total sessions`;
      }
    }, 300);

    searchInput.addEventListener('input', filterSessions);

    // Initialize count
    countDisplay.textContent = `${sections.length} total sessions`;
  }

  /**
   * Enhancement 6: Improve table of contents for abstract pages
   */
  function addTableOfContents() {
    const main = document.querySelector('main');
    const headings = main?.querySelectorAll('h2');

    // Only add TOC if there are 4+ sections
    if (!headings || headings.length < 4) return;

    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.setAttribute('aria-label', 'Table of contents');
    toc.style.cssText = `
      background-color: var(--aps-neutral-100, #f2f2f2);
      padding: 1.5rem;
      margin: 2rem 0;
      border-radius: 0.375rem;
      border-left: 4px solid var(--aps-primary-600, #00538b);
    `;

    const tocTitle = document.createElement('h2');
    tocTitle.textContent = 'On this page';
    tocTitle.style.cssText = `
      margin-top: 0;
      font-size: 1.25rem;
      color: var(--aps-primary-600, #00538b);
    `;

    const tocList = document.createElement('ul');
    tocList.style.cssText = `
      list-style: none;
      padding: 0;
      margin: 1rem 0 0 0;
    `;

    headings.forEach((heading, index) => {
      // Add ID if not present
      if (!heading.id) {
        heading.id = `section-${index}`;
      }

      const li = document.createElement('li');
      li.style.cssText = `
        margin-bottom: 0.5rem;
      `;

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.style.cssText = `
        color: var(--aps-primary-600, #00538b);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
      `;

      link.addEventListener('mouseenter', () => {
        link.style.color = 'var(--aps-primary-500, #3073a2)';
        link.style.textDecoration = 'underline';
      });

      link.addEventListener('mouseleave', () => {
        link.style.color = 'var(--aps-primary-600, #00538b)';
        link.style.textDecoration = 'none';
      });

      li.appendChild(link);
      tocList.appendChild(li);
    });

    toc.appendChild(tocTitle);
    toc.appendChild(tocList);

    // Insert after h1
    const h1 = main.querySelector('h1');
    if (h1) {
      h1.after(toc);
    }
  }

  /**
   * Enhancement 7: Print optimization
   */
  function enhancePrint() {
    // Add print button
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Print';
    printButton.setAttribute('aria-label', 'Print this page');
    printButton.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background-color: white;
      color: var(--aps-primary-600, #00538b);
      border: 2px solid var(--aps-primary-600, #00538b);
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 83, 139, 0.2);
    `;

    // Hide in print
    printButton.style.setProperty('display', 'block', '');
    const printStyle = document.createElement('style');
    printStyle.textContent = `
      @media print {
        .back-to-top,
        button[aria-label="Print this page"],
        .session-filter {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(printStyle);

    document.body.appendChild(printButton);

    printButton.addEventListener('click', () => {
      window.print();
    });

    printButton.addEventListener('mouseenter', () => {
      printButton.style.backgroundColor = 'var(--aps-primary-600, #00538b)';
      printButton.style.color = 'white';
      printButton.style.transform = 'scale(1.05)';
    });

    printButton.addEventListener('mouseleave', () => {
      printButton.style.backgroundColor = 'white';
      printButton.style.color = 'var(--aps-primary-600, #00538b)';
      printButton.style.transform = 'scale(1)';
    });
  }

  /**
   * Initialize all enhancements
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Add enhancements
    try {
      addLoadingIndicator();
      addBackToTop();
      enhanceLinks();
      enhanceKeyboardNav();
      addSessionFilter();
      addTableOfContents();
      enhancePrint();

      console.log('✓ APS Archive enhancements loaded');
    } catch (error) {
      console.error('Error loading APS Archive enhancements:', error);
    }
  }

  // Start initialization
  init();

})();
