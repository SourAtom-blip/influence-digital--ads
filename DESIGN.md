---
name: Influence Digital Ads
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for an enterprise-tier digital advertising agency, projecting a persona of **authority, precision, and strategic innovation**. The target audience comprises CMOs, marketing directors, and high-growth founders who value data-driven results over stylistic trends.

The aesthetic follows a **Corporate Modern** approach. It leverages high-density information architecture balanced by expansive whitespace to create a "premium-technical" atmosphere. The interface should feel like a high-end command center: disciplined, expensive, and meticulously organized. Visual interest is generated through perfect alignment and subtle depth rather than decorative elements.

## Colors

The palette is rooted in a monochromatic blue spectrum to reinforce a sense of institutional stability and trust.

- **Primary (Deep Navy):** Used for primary navigation, headings, and high-impact background sections to anchor the layout.
- **Secondary (Action Blue):** A vibrant, high-contrast blue reserved exclusively for interactive elements like primary buttons, active states, and focus indicators.
- **Surface & Backgrounds:** A range of ultra-light grays (F8FAFC to F1F5F9) used to distinguish content zones without the harshness of pure black-on-white.
- **Semantic Colors:** Success, Warning, and Error states should use desaturated tones to remain consistent with the professional, understated brand tone.

## Typography

The system utilizes **Inter** for all primary communication. Its tall x-height and clinical clarity align perfectly with the "high-end tech firm" aesthetic. 

- **Headlines:** Set with tight tracking and heavy weights to create a sense of presence.
- **Body Text:** Uses a generous 1.6 line height to ensure readability in data-heavy contexts.
- **Mono Accents:** **JetBrains Mono** is introduced for small labels, data points, and metadata to reinforce the agency's technical and analytical prowess.
- **Mobile Scaling:** Display sizes drop significantly on mobile to maintain vertical rhythm and avoid excessive word breaking.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for desktop to maintain a controlled, editorial feel, transitioning to a fluid model for mobile devices.

- **Grid:** 12-column system on desktop with a maximum container width of 1280px.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Vertical Air:** Use "stack-lg" (48px) or greater between major sections to prevent the UI from feeling "crowded" or "budget."
- **Data Density:** While marketing pages are airy, dashboard views may reduce spacing to "stack-sm" to increase information density for expert users.

## Elevation & Depth

To maintain a premium look, depth is communicated through **low-contrast outlines and subtle tonal layering** rather than heavy drop shadows.

- **Surface Tiers:** Backgrounds use the lightest gray, while primary content cards use pure white. This subtle shift creates hierarchy without visual noise.
- **Shadows:** When used, shadows must be ultra-diffused (20px+ blur) and low-opacity (less than 4% alpha) using a navy-tinted hex to avoid a "dirty" gray appearance.
- **Interactivity:** Elements should appear to "lift" slightly on hover through a subtle increase in shadow spread or a 1px border color shift to the Action Blue.

## Shapes

The design system uses a **Soft (0.25rem)** roundedness logic. This "nearly sharp" approach conveys professional discipline and precision, differentiating the brand from the "bubbly" aesthetics of consumer-facing startups.

- **Small Components:** Inputs and buttons use the base 4px radius.
- **Large Components:** Cards and modals may scale up to 8px (rounded-lg) to soften the large surface area, but should never reach "pill" or "circle" territory unless for specific status indicators.

## Components

- **Buttons:** 
    - *Primary:* Solid Deep Navy background with white text. High-contrast, sharp, and authoritative.
    - *Secondary:* Transparent background with a 1px Navy or Light Gray border.
    - *Interaction:* Subtle micro-transitions (200ms ease-out) for color shifts.
- **Cards:** White background, 1px border in Light Gray (#E2E8F0). Padding should be at least 32px (4 units) to maintain the premium feel.
- **Inputs:** Clean, 1px bordered fields. On focus, the border shifts to Action Blue with a subtle outer glow (0px 0px 0px 3px rgba(37, 99, 235, 0.1)).
- **Chips/Badges:** Monochromatic styling using JetBrains Mono. Use subtle background tints (e.g., 10% opacity of the status color) to keep them secondary to the main content.
- **Data Visuals:** Charts should use a refined palette of blues and teals, avoiding bright "traffic light" colors unless indicating critical errors.