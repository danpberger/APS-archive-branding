# APS.org Events Calendar - Design System Analysis

**Site:** https://www.aps.org/events/calendar/ (redirects from schedule.aps.org)  
**Date Analyzed:** 2025-11-11  
**Framework:** Next.js with Tailwind CSS

---

## 1. Visual Design & Branding

### Color Palette

#### Primary Colors (Blue Palette)
- **Primary Brand Blue** (`--aps-primary-600`): `#00538b` (RGB: 0, 83, 139)
- `--aps-primary-100`: `#eff4ff` - Very light blue background
- `--aps-primary-200`: `#bfd4e8` - Light blue
- `--aps-primary-300`: `#8fb4d1` - Medium-light blue
- `--aps-primary-400`: `#6093b9` - Medium blue
- `--aps-primary-500`: `#3073a2` - Medium-dark blue
- `--aps-primary-700`: `#004069` - Dark blue
- `--aps-primary-800`: `#003657` - Darker blue
- `--aps-primary-900`: `#001a24` - Darkest blue

#### Secondary Colors (Teal/Green Palette)
- **Secondary/Teal** (`--aps-secondary`): `#00b48d` (RGB: 0, 180, 141)
- `--aps-secondary-100`: `#cafdff` - Very light teal
- `--aps-secondary-200`: `#87e5d9` - Light teal
- `--aps-secondary-300`: `#43ccb3` - Medium-light teal
- `--aps-secondary-400`: `#00b48d` - Primary teal
- `--aps-secondary-500`: `#008e6e` - Medium-dark teal
- `--aps-secondary-600`: `#007b5e` - Dark teal
- `--aps-secondary-700`: `#006c55` - Darker teal
- `--aps-secondary-800`: `#00412f` - Very dark teal
- `--aps-secondary-900`: `#001b10` - Darkest teal

#### Light Blue Accent
- `--aps-lightblue-400`: `#00afe9` (Primary light blue)
- `--aps-lightblue-300`: `#4ec6f0`
- `--aps-lightblue-200`: `#9dddf8`

#### Neutral Colors (Grays)
- `--aps-neutral-100`: `#f2f2f2` - Very light gray (backgrounds)
- `--aps-neutral-200`: `#d0d0d0` - Light gray (borders)
- `--aps-neutral-300`: `#aeaeaf` - Medium-light gray
- `--aps-neutral-400`: `#8d8d8d` - Medium gray
- `--aps-neutral-500`: `#6b6b6c` - Medium-dark gray
- `--aps-neutral-600`: `#49494a` - Dark gray (text)
- `--aps-neutral-700`: `#2e2f35` - Darker gray
- `--aps-neutral-800`: `#26262e` - Very dark gray
- `--aps-neutral-900`: `#1d1e27` (RGB: 29, 30, 39) - Darkest gray (primary text)

#### Utility Colors

**Yellow/Warning:**
- `--aps-yellow-100`: `#fff79f` - Light yellow
- `--aps-yellow-200`: `#ffdf4f` - Primary yellow
- `--aps-warning-400`: `#facc15`
- `--aps-warning-500`: `#eab308`

**Success/Green:**
- `--aps-success-500`: `#22c55e` (RGB: 34, 197, 94)
- `--aps-success-600`: `#16a34a`

**Danger/Error:**
- `--aps-danger-500`: `#ef4444` (RGB: 239, 68, 68)
- `--aps-danger-600`: `#dc2626`

**Info/Gray:**
- `--aps-info-900`: `#111827` (RGB: 17, 24, 39)
- `--aps-info-600`: `#4b5563` (RGB: 75, 85, 99)

#### Background Colors
- **White/Primary Background:** `#ffffff`
- **Neutral Surface 1:** `#fff` with foreground `--aps-neutral-900`
- **Neutral Surface 2:** `--aps-neutral-100` (#f2f2f2) with foreground `--aps-neutral-900`

#### Gradients
- **Gradient 1 (Primary):**  
  ```css
  radial-gradient(60.18% 56.75% at 37.31% 46.62%, var(--aps-primary-500) 0%, var(--aps-primary-600) 100%)
  ```
  
- **Gradient 2 (Light Blue to Primary):**  
  ```css
  radial-gradient(113.3% 157.25% at 117.05% -72.91%, var(--aps-lightblue-300) 0%, var(--aps-primary-600) 99.35%)
  ```
  
- **Gradient 3 (Teal to Primary):**  
  ```css
  radial-gradient(113.3% 157.25% at 117.05% -72.91%, var(--aps-secondary-300) 0%, var(--aps-primary-600) 99.35%)
  ```

---

## 2. Typography

### Font Family

**Primary Font:** **Jost** (Variable Font)
- Loaded from `/font/Jost-VF.ttf`
- Weight range: 100-900
- Applied via `font-family: var(--font-jost);`

**System Font Stack (Fallback):**
```css
ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji
```

**Monospace Font Stack:**
```css
ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace
```

### Font Weights

- `--aps-font-default`: **350** (Body text)
- `--aps-font-title`: **700** (Page titles)
- `--aps-font-heading`: **600** (Headings H1-H6)
- `--aps-font-button`: **600** (Buttons and CTAs)
- `--aps-font-link`: **500** (Hyperlinks)
- `--aps-font-bold`: **600** (Bold/strong text)
- `--aps-font-overline`: **300** (Overline/label text)

### Font Sizes (Fluid/Responsive)

**Base sizes use CSS `clamp()` for responsive scaling:**

- `--aps-text-xs`: `clamp(0.7071rem, 0.0976vw + 0.6876rem, 0.7501rem)` (~11-12px)
- `--aps-text-sm`: `clamp(0.8409rem, 0.1766vw + 0.8056rem, 0.9186rem)` (~13-15px)
- `--aps-text-base`: `clamp(1rem, 0.2841vw + 0.9432rem, 1.125rem)` (16-18px) **← Body text**
- `--aps-text-lg`: `clamp(1.1892rem, 0.4286vw + 1.1035rem, 1.3778rem)` (~19-22px)
- `--aps-text-xl`: `clamp(1.4142rem, 0.6209vw + 1.29rem, 1.6874rem)` (~23-27px)
- `--aps-text-2xl`: `clamp(1.6818rem, 0.8745vw + 1.5069rem, 2.0665rem)` (~27-33px)
- `--aps-text-3xl`: `clamp(2rem, 1.2067vw + 1.7586rem, 2.5309rem)` (32-40px)
- `--aps-text-4xl`: `clamp(2.3783rem, 1.6391vw + 2.0505rem, 3.0996rem)` (~38-50px)
- `--aps-text-5xl`: `clamp(2.8283rem, 2.1994vw + 2.3885rem, 3.796rem)` (~45-61px)
- `--aps-text-6xl`: `clamp(3.3634rem, 2.9217vw + 2.7791rem, 4.649rem)` (~54-74px)
- `--aps-text-7xl`: `clamp(3.9998rem, 3.8496vw + 3.2299rem, 5.6936rem)` (~64-91px)
- `--aps-text-8xl`: `clamp(4.7566rem, 5.0373vw + 3.7491rem, 6.973rem)` (~76-112px)
- `--aps-text-9xl`: `clamp(5.6565rem, 6.553vw + 4.3459rem, 8.5398rem)` (~90-137px)
- `--aps-text-button`: `1.125rem` (18px) **← Buttons**

### Line Heights

- `--aps-leading-default`: **1.6** (Body text, paragraphs)
- `--aps-leading-heading`: **1.1** (Headings)
- `--aps-leading-button`: **1.2** (Buttons)
- `--aps-leading-sm`: **1.5** (Small text)
- `--aps-leading-xs`: **1.4** (Extra-small text)

### Letter Spacing (Tracking)

- `--aps-tracking-default`: `calc(2 * 0.01em)` = **0.02em** (Body)
- `--aps-tracking-heading`: `calc(-2 * 0.01em)` = **-0.02em** (Headings - tighter)
- `--aps-tracking-button`: `calc(2 * 0.01em)` = **0.02em** (Buttons)
- `--aps-tracking-overline`: `calc(20 * 0.01em)` = **0.2em** (All-caps labels)
- `--aps-tracking-sm`: `calc(4 * 0.01em)` = **0.04em** (Small text)
- `--aps-tracking-xs`: `calc(8 * 0.008em)` = **0.064em** (Extra-small)

### Body Text Settings

```css
body {
  font-family: var(--font-jost);
  font-weight: 350; /* Light-medium weight */
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--text-color); /* Likely --aps-neutral-900 */
  background-color: #fff;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Heading Styles

```css
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
  font-weight: 600; /* --aps-font-heading */
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

### Link Styles

```css
a {
  color: inherit;
  text-decoration: inherit;
  font-weight: 500; /* --aps-font-link */
}
```

**Primary Link Color:** `--aps-primary-600` (#00538b) for styled links

### Strong/Bold Text

```css
b, strong {
  font-weight: 600; /* --aps-font-bold */
}
```

---

## 3. Layout & Structure

### Container System

**Max-width Breakpoints:**
```css
.container {
  width: 100%;
}

@media (min-width: 320px) { .container { max-width: 320px; } }
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
@media (min-width: 1536px) { .container { max-width: 1536px; } }
@media (min-width: 2000px) { .container { max-width: 2000px; } }
```

**Primary Content Container:**
```css
.max-w-7xl {
  max-width: 80rem; /* 1280px */
  margin: 0 auto;
}
```

### Header Structure

**Header Layout:**
- Fixed/sticky positioning: `position: relative; z-index: 100;`
- Background: White (`bg-white`)
- Container: `max-w-7xl w-full mx-auto`
- Padding: `p-0 lg:px-16` (0 mobile, 4rem desktop)
- Height: `lg:h-24` (6rem on desktop)
- Flexbox alignment: `flex items-center lg:items-end`

**Logo:**
- SVG format: 241×70px (original dimensions)
- Responsive height: `h-[55px]` mobile, `xl:h-[75px]` desktop
- Negative margin for alignment: `lg:-ml-4 lg:mb-[0.1rem]`

**Mobile Menu Button:**
- Size: `w-9 h-9` (36×36px)
- Text size: `text-[1.25rem]` (20px icon)
- Color: `text-aps-primary-600` (#00538b)
- Border radius: `rounded-[0.25rem]` (4px)

### Navigation Design

**Desktop Navigation:**
- Horizontal layout: `flex flex-row mb-2`
- Border separators: `border-l border-aps-neutral-100` between items
- Padding: `pl-2 ml-2` for spacing
- Min height: `min-h-8` (2rem / 32px)

**Navigation Links:**
- Font size: Desktop `text-[1rem]` (16px), Mobile `text-[1.375rem]` (22px)
- Font weight: Desktop `font-medium` (500), Mobile `font-semibold` (600)
- Color: `text-aps-neutral-900` desktop, `text-aps-primary-600` mobile
- Hover: `[&:hover>span]:underline [&:hover>span]:text-aps-primary-600`

**Active State Underline (Desktop):**
```css
before:h-[0.125rem] /* 2px thick */
before:bg-aps-primary-400 /* Blue underline */
before:opacity-0 /* Hidden by default */
data-[state=open]:before:opacity-100 /* Show on open */
data-[state=open]:before:-top-[0.125rem] /* Position at top */
```

**Dropdown/Flyout Menu:**
- Background: `bg-aps-neutral-100` (#f2f2f2)
- Padding: Desktop `lg:pt-8 pt-2 lg:pb-12 pb-2`
- Animation: `animate-slide-down-big` (250ms ease-in-out)
- Grid layout: `grid lg:grid-cols-4 gap-1.5 lg:gap-8`

**Flyout Link Styles:**
- Title font: `text-[1.125rem]` (18px), `font-medium` (500)
- Description font: `text-[0.875rem]` (14px)
- Padding: Mobile `py-1 px-4`, Desktop `p-0`
- Color: `text-aps-primary-600`
- Hover: `hover:underline`

### Search Interface

**Search Bar:**
- Border: `border border-aps-neutral-900` (1px solid dark)
- Height: Mobile `h-11` (44px), Desktop `h-13` (52px)
- Padding: `px-3` (0.75rem / 12px)
- Input outline: `outline-none`
- Border radius: `border-radius: 0.125rem` (2px)

**Search Icon:**
- Font size: `text-[1.25rem]` (20px)
- Color: `text-aps-secondary` (teal)

### Footer Structure

**Footer Layout:**
- Multi-column grid (appears to be 4 columns based on navigation structure)
- Column categories: "Get involved", "Read and publish", "Meet and connect", "Our Society"
- Link groups with section headings

---

## 4. Component Patterns

### Buttons

**Primary Button (Form Button):**
```css
.custom-form button {
  display: flex;
  width: 8rem; /* 128px */
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* 8px between icon and text */
  padding: 0.75rem; /* 12px */
  font-weight: 500;
  font-size: 1.125rem; /* 18px - --aps-text-button */
  border-radius: 0.125rem; /* 2px */
  background-color: var(--aps-primary-600); /* #00538b */
  color: #ffffff;
  margin-top: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s linear;
}

.custom-form button:hover,
.custom-form button:focus,
.custom-form button:active {
  background-image: var(--aps-gradient-1); /* Radial gradient on hover */
}
```

**CTA Button (Primary Action):**
- Background: `bg-aps-primary-600` (#00538b)
- Hover: Gradient overlay `background-image: var(--aps-gradient-1)`
- Padding: `px-4 py-3` (1rem / 16px horizontal, 0.75rem / 12px vertical)
- Font: `font-semibold` (600), `text-[1.125rem]` (18px)

**Last Navigation Item Button (Join Now):**
```css
last:lg:bg-aps-primary-600 /* Blue background on last item */
group/nav last:lg:ml-2 /* Additional margin */
```
- Padding: `lg:px-4` (1rem / 16px)
- Background: `bg-aps-primary-600` (blue)
- Text color: White

### Link Styles

**Standard Links:**
```css
a {
  color: inherit;
  text-decoration: inherit;
  font-weight: 500; /* --aps-font-link */
}
```

**Primary Content Links:**
- Color: `text-aps-primary-600` (#00538b)
- Hover: `hover:underline`
- Font size: `text-[1.125rem]` (18px)
- Font weight: `font-medium` (500)

**Navigation Links (Hover State):**
```css
[&:hover>span]:underline
[&:hover>span]:text-aps-primary-600
```

**Breadcrumb/Small Links:**
- Font size: `text-[1rem]` (16px)
- Font weight: `font-normal` (400)

### Form Elements

**Input Fields:**
```css
.custom-form input:not([type=checkbox]),
.custom-form textarea {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.125rem; /* 2px */
  border-width: 1px;
  border-color: rgb(17 24 39); /* --aps-info-900 */
  padding: 0.5rem; /* 8px */
}

.custom-form input:focus-visible,
.custom-form textarea:focus-visible {
  border-color: var(--aps-primary-600); /* Blue on focus */
}
```

**Placeholder Text:**
```css
::placeholder {
  opacity: 1;
  color: #9ca3af; /* Gray-400 */
  font-weight: 300;
}
```

**Select Dropdown:**
```css
.custom-form select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 0.125rem; /* 2px */
  border: 1px solid rgb(17 24 39);
  background-color: rgb(255 255 255);
  padding: 0.5rem;
  font-weight: 400;
  color: rgb(17 24 39);
  appearance: none; /* Remove native styling */
}
```

### Cards/Content Blocks

**Featured Card (based on navigation structure):**
- Border: `lg:border lg:border-aps-neutral-300`
- Padding: `lg:py-5 lg:px-6` (1.25rem / 20px vertical, 1.5rem / 24px horizontal)
- Gap: `gap-3 lg:gap-4`
- Background: White (default)

**Card Heading:**
- Font size: `text-lg` (var(--aps-text-lg))
- Font weight: `font-semibold` (600)
- Line height: `leading-heading` (1.1)

**Card Description:**
- Font size: `text-[1rem]` (16px)
- Line height: `leading-[1.2]`
- Color: Inherit (likely --aps-neutral-900)

### Alert/Status Messages

**Form Alert:**
```css
.custom-form-alert {
  display: inline-block;
  width: 100%;
  border-radius: 0.375rem; /* 6px */
  padding: 0.5rem; /* 8px */
  box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1);
  background-image: url("data:image/svg+xml,..."); /* Texture pattern */
}

@media (min-width: 768px) {
  .custom-form-alert {
    width: 50%;
  }
}

.custom-form-alert[data-status=success] {
  background-color: rgb(34 197 94); /* Green */
  color: rgb(240 253 244); /* Very light green text */
}

.custom-form-alert[data-status=error] {
  background-color: rgb(239 68 68); /* Red */
  color: rgb(254 242 242); /* Very light red text */
}
```

**Disclaimer Alert:**
```css
.disclaimer {
  display: flex;
  align-items: center;
  gap: 1rem; /* 16px */
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.375rem; /* 6px */
  background-color: rgba(255, 247, 159, 0.3); /* Light yellow with opacity */
  padding: 0.5rem; /* 8px */
  color: rgba(37 20 0); /* Dark brown text */
}
```

### Loading Spinner

```css
span.spinner {
  height: 1.25rem; /* 20px */
  width: 1.25rem; /* 20px */
  animation: spin 1s linear infinite;
  border-radius: 9999px; /* Full circle */
  border-width: 2px;
  border-color: var(--aps-primary-500);
  border-top-color: var(--aps-secondary-500); /* Teal top for animation */
}
```

---

## 5. Spacing & Rhythm

### Standard Spacing Scale

**Based on Tailwind's default scale (multiples of 0.25rem / 4px):**

- `0.125rem` (2px) - Border radius, fine borders
- `0.25rem` (4px) - Minimal spacing
- `0.5rem` (8px) - Small padding, gaps
- `0.75rem` (12px) - Button padding vertical
- `1rem` (16px) - Standard padding, margins
- `1.25rem` (20px) - Medium padding
- `1.5rem` (24px) - Large padding
- `2rem` (32px) - Section spacing
- `3rem` (48px) - Large section spacing
- `4rem` (64px) - Extra-large spacing (desktop padding: `lg:px-16`)

### Component-Specific Spacing

**Header:**
- Height: `lg:h-24` (6rem / 96px on desktop)
- Horizontal padding: `lg:px-16` (4rem / 64px)
- Mobile padding: `py-2 px-4` (0.5rem vertical, 1rem horizontal)

**Navigation:**
- Item spacing: `pl-2 ml-2` (0.5rem / 8px)
- Dropdown padding: Desktop `lg:pt-8 lg:pb-12` (2rem top, 3rem bottom)
- Grid gap: Desktop `lg:gap-8` (2rem / 32px)

**Form Elements:**
- Input padding: `0.5rem` (8px)
- Button padding: `0.75rem` (12px all sides)
- Field margin bottom: `margin-bottom: 0.5rem` (8px)
- Button margin: `margin-top: 1rem; margin-bottom: 1rem` (16px)

**Cards:**
- Padding: Desktop `lg:py-5 lg:px-6` (1.25rem / 20px vertical, 1.5rem / 24px horizontal)
- Gap: `gap-3 lg:gap-4` (0.75rem mobile, 1rem desktop)

**Alerts:**
- Padding: `0.5rem` (8px)
- Margin: `1rem` (16px top and bottom)
- Border radius: `0.375rem` (6px)

### Vertical Rhythm

**Typography Margins (Prose):**
- Paragraph margin: `margin-top: 1.25em; margin-bottom: 1.25em`
- H1 margin: `margin-top: 0; margin-bottom: 0.8888889em`
- H2 margin: `margin-top: 2em; margin-bottom: 1em`
- H3 margin: `margin-top: 1.6em; margin-bottom: 0.6em`
- H4 margin: `margin-top: 1.5em; margin-bottom: 0.5em`
- List margin: `margin-top: 1.25em; margin-bottom: 1.25em`

---

## 6. Interactive Elements

### Hover Effects

**Links:**
```css
a:hover {
  text-decoration: underline;
  color: var(--aps-primary-600); /* Blue on hover */
}
```

**Buttons:**
```css
button:hover,
button:focus,
button:active {
  background-image: var(--aps-gradient-1);
  /* Radial gradient from primary-500 to primary-600 */
}
```

**Navigation Items:**
```css
/* Underline animation on hover */
before:transition-all before:duration-[250ms] before:ease-in-out
before:opacity-0
hover:before:opacity-100
hover:before:-top-[0.125rem]
```

### Focus States

**Input Focus:**
```css
input:focus-visible,
textarea:focus-visible {
  border-color: var(--aps-primary-600); /* Blue border */
  outline: none;
}
```

**Button Focus:**
- Same as hover state: gradient overlay
- No separate focus ring (uses default browser focus)

**General Focus Styles:**
```css
:-moz-focusring {
  outline: auto;
}
```

### Active States

**Button Active:**
- Same treatment as hover/focus: gradient background

**Navigation Active:**
```css
data-[state=open]:before:opacity-100
data-[state=open]:before:bg-aps-primary-400
/* Shows blue underline bar when menu is open */
```

### Transitions & Animations

**Standard Transition:**
```css
transition-property: all;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 0.2s;
transition-timing-function: linear;
```

**Navigation Underline Transition:**
```css
transition-all duration-[250ms] ease-in-out
```

**Dropdown Animations:**
- **Slide Down:** `animate-slide-down-big` (250ms ease-in-out)
- **Fade In:** `data-[state=open]:animate-fade-in`
- **Fade Out:** `data-[state=closed]:animate-fade-out`
- **Slide Left/Right:** Desktop flyout directional animations

**Chevron Rotation (Menu Toggle):**
```css
.fa-chevron-down {
  transition: transform 200ms;
  transform: rotate(0deg);
}

[data-state=open] ~ .fa-chevron-down {
  transform: rotate(-180deg);
}
```

**Spinner Animation:**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

animation: spin 1s linear infinite;
```

### Cursor Styles

```css
[role=button], button {
  cursor: pointer;
}

:disabled {
  cursor: default;
}
```

---

## 7. Responsive Breakpoints

**Tailwind Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px ← **Primary desktop breakpoint**
- `xl`: 1280px
- `2xl`: 1536px
- Custom: `2000px`

**Common Responsive Patterns:**

**Mobile-First Approach:**
```css
/* Mobile default */
.element {
  flex-direction: column;
  padding: 0.5rem;
}

/* Desktop override */
@media (min-width: 1024px) {
  .element {
    flex-direction: row;
    padding: 4rem;
  }
}
```

**Example Usage:**
- Logo height: `h-[55px] xl:h-[75px]`
- Container padding: `p-4 lg:px-16`
- Navigation: `flex-col lg:flex-row`
- Grid: `grid gap-1.5 lg:grid-cols-4 lg:gap-8`

---

## 8. Accessibility Features

### Semantic HTML
- `<header role="banner">`
- `<nav aria-label="Main">`
- `<button aria-expanded="false" aria-controls="..."`

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  border: 0;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  word-wrap: normal;
}
```

### Focus Indicators
- Browser default focus outlines preserved
- High contrast focus states on form elements

### Text Rendering
```css
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}
```

---

## 9. Additional Design Details

### Border Styling
- **Default border:** `border: 0 solid #e5e7eb`
- **Primary borders:** `1px` thickness
- **Border radius:** Typically `0.125rem` (2px) or `0.375rem` (6px)

### Shadows
**Soft Shadow (Alerts):**
```css
box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1);
```

### Image Styling
```css
img, video {
  display: block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
}
```

### Prose/Content Styling

**Max Width:**
```css
.prose {
  max-width: 65ch; /* Optimal reading width */
}
```

**List Styles:**
- Ordered lists: Decimal numbering
- Unordered lists: Disc bullets
- Padding: `padding-inline-start: 1.625em`

### Text Wrapping

```css
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance; /* Better heading line breaks */
}
```

---

## 10. Design Tokens Summary (CSS Custom Properties)

```css
:root {
  /* Colors */
  --aps-primary-600: #00538b;
  --aps-secondary-400: #00b48d;
  --aps-neutral-100: #f2f2f2;
  --aps-neutral-900: #1d1e27;
  
  /* Typography */
  --aps-text-base: clamp(1rem, 0.2841vw + 0.9432rem, 1.125rem);
  --aps-font-default: 350;
  --aps-font-heading: 600;
  --aps-leading-default: 1.6;
  --aps-leading-heading: 1.1;
  --aps-tracking-default: 0.02em;
  --aps-tracking-heading: -0.02em;
  
  /* Surfaces */
  --aps-surface-brand-1-bg: var(--aps-primary-600);
  --aps-surface-brand-1-fg: #fff;
  --aps-surface-neutral-1-bg: #fff;
  --aps-surface-neutral-1-fg: var(--aps-neutral-900);
  
  /* Gradients */
  --aps-gradient-1: radial-gradient(60.18% 56.75% at 37.31% 46.62%, 
                      var(--aps-primary-500) 0%, 
                      var(--aps-primary-600) 100%);
}
```

---

## 11. Implementation Notes

### Framework
- **Next.js** (React-based)
- **Tailwind CSS** (utility-first CSS framework)
- **Radix UI** (accessible component primitives for navigation)

### Font Loading
- **Jost Variable Font** loaded via `@font-face`
- Next.js font optimization: `data-next-font="size-adjust"`

### Image Optimization
- **Next.js Image Component** with responsive srcSet
- **CDN:** Sanity.io CDN with Cloudinary integration
- **Lazy loading** with `loading="lazy"`

### Performance
- **Static generation** (SSG) for calendar pages
- **Dehydrated state** for React Query caching
- **Code splitting** by route

---

## CSS Code Examples for Recreation

### Basic Page Setup
```css
:root {
  --aps-primary-600: #00538b;
  --aps-secondary-400: #00b48d;
  --aps-neutral-100: #f2f2f2;
  --aps-neutral-900: #1d1e27;
  --aps-gradient-1: radial-gradient(60.18% 56.75% at 37.31% 46.62%, 
                      #3073a2 0%, #00538b 100%);
}

body {
  font-family: 'Jost', ui-sans-serif, system-ui, sans-serif;
  font-weight: 350;
  font-size: clamp(1rem, 0.2841vw + 0.9432rem, 1.125rem);
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: #1d1e27;
  background-color: #ffffff;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

a {
  color: #00538b;
  font-weight: 500;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #ffffff;
  background-color: #00538b;
  border: none;
  border-radius: 0.125rem;
  cursor: pointer;
  transition: all 0.2s linear;
}

.btn-primary:hover,
.btn-primary:focus {
  background-image: radial-gradient(60.18% 56.75% at 37.31% 46.62%, 
                      #3073a2 0%, #00538b 100%);
}
```

### Header Layout
```css
header {
  position: relative;
  z-index: 100;
  background-color: #ffffff;
}

.header-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0.5rem 1rem;
}

@media (min-width: 1024px) {
  .header-container {
    padding: 0 4rem;
    height: 6rem;
    display: flex;
    align-items: flex-end;
  }
}

.logo {
  height: 55px;
}

@media (min-width: 1280px) {
  .logo {
    height: 75px;
  }
}
```

### Form Input
```css
input[type="text"],
input[type="email"],
input[type="search"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #111827;
  border-radius: 0.125rem;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  background-color: #ffffff;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #00538b;
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
  font-weight: 300;
  opacity: 1;
}
```

---

**End of Analysis**

This comprehensive design analysis provides all necessary CSS values and design patterns to recreate the APS.org Events Calendar visual design using only CSS.
