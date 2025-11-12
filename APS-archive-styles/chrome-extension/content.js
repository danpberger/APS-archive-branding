/**
 * APS Archive Branding POC - Content Script
 * Injects CSS and JavaScript into archive.aps.org pages based on user settings
 */

(function() {
  'use strict';

  console.log('APS Archive Branding POC - Content script loaded');

  // IDs for injected elements to avoid duplicates
  const CSS_ID = 'aps-archive-branding-css';
  const JS_ID = 'aps-archive-branding-js';

  /**
   * Load CSS content from file
   */
  async function loadCSS() {
    try {
      const url = chrome.runtime.getURL('archive-branding.css');
      const response = await fetch(url);
      const cssText = await response.text();
      return cssText;
    } catch (error) {
      console.error('Error loading CSS:', error);
      return null;
    }
  }

  /**
   * Load JavaScript content from file
   */
  async function loadJS() {
    try {
      const url = chrome.runtime.getURL('archive-enhancements.js');
      const response = await fetch(url);
      const jsText = await response.text();
      return jsText;
    } catch (error) {
      console.error('Error loading JavaScript:', error);
      return null;
    }
  }

  /**
   * Inject CSS into the page
   */
  function injectCSS(cssText) {
    // Remove existing CSS if present
    const existing = document.getElementById(CSS_ID);
    if (existing) {
      existing.remove();
    }

    // Create and inject new style element
    const style = document.createElement('style');
    style.id = CSS_ID;
    style.textContent = cssText;

    // Insert at the end of head to ensure it overrides existing styles
    if (document.head) {
      document.head.appendChild(style);
      console.log('✓ APS Archive CSS injected');
    } else {
      // If head doesn't exist yet, wait for it
      const observer = new MutationObserver(() => {
        if (document.head) {
          document.head.appendChild(style);
          console.log('✓ APS Archive CSS injected (delayed)');
          observer.disconnect();
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  /**
   * Inject JavaScript into the page
   */
  function injectJS(jsText) {
    // Remove existing JS if present
    const existing = document.getElementById(JS_ID);
    if (existing) {
      existing.remove();
    }

    // Create and inject script element
    const script = document.createElement('script');
    script.id = JS_ID;
    script.textContent = jsText;

    // Inject into page context (not extension context)
    if (document.documentElement) {
      document.documentElement.appendChild(script);
      console.log('✓ APS Archive JS injected');
    }
  }

  /**
   * Remove injected CSS
   */
  function removeCSS() {
    const existing = document.getElementById(CSS_ID);
    if (existing) {
      existing.remove();
      console.log('✗ APS Archive CSS removed');
    }
  }

  /**
   * Remove injected JavaScript
   */
  function removeJS() {
    const existing = document.getElementById(JS_ID);
    if (existing) {
      existing.remove();
      console.log('✗ APS Archive JS removed');
    }
  }

  /**
   * Apply settings based on user configuration
   */
  async function applySettings(settings) {
    console.log('Applying settings:', settings);

    if (!settings.enabled) {
      // Remove all injections if disabled
      removeCSS();
      removeJS();
      return;
    }

    // Inject CSS if enabled
    if (settings.injectCSS) {
      const cssText = await loadCSS();
      if (cssText) {
        injectCSS(cssText);
      }
    } else {
      removeCSS();
    }

    // Inject JS if enabled
    if (settings.injectJS) {
      const jsText = await loadJS();
      if (jsText) {
        // Wait for DOM to be ready before injecting JS
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            injectJS(jsText);
          });
        } else {
          injectJS(jsText);
        }
      }
    } else {
      removeJS();
    }
  }

  /**
   * Initialize the content script
   */
  async function init() {
    // Load settings from storage
    const defaultSettings = {
      enabled: true,
      injectCSS: true,
      injectJS: true
    };

    try {
      const settings = await chrome.storage.sync.get(defaultSettings);
      await applySettings(settings);
    } catch (error) {
      console.error('Error initializing APS Archive Branding:', error);
      // Apply defaults on error
      await applySettings(defaultSettings);
    }

    // Listen for settings changes
    chrome.storage.onChanged.addListener(async (changes, areaName) => {
      if (areaName === 'sync') {
        console.log('Settings changed:', changes);
        const settings = await chrome.storage.sync.get(defaultSettings);
        await applySettings(settings);
      }
    });
  }

  // Start initialization
  init();

})();
