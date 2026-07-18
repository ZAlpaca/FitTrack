---
name: Kinetic Noir
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#303032'
  tertiary-container: '#e4e2e4'
  on-tertiary-container: '#656466'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474649'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
  metric-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 20px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
  section-gap: 40px
---

## Brand & Style

The design system is engineered for a premium, high-performance fitness experience. It targets athletes and wellness enthusiasts who value data clarity and aesthetic sophistication. The visual narrative combines the intensity of night-time training with the refinement of luxury high-tech gear.

The style is a hybrid of **Minimalism** and **Glassmorphism**. By utilizing a "Pure Dark" foundation, the interface eliminates visual noise, allowing vibrant biometric data and high-quality photography to command attention. The emotional response is one of focus, energy, and elite capability—mimicking the feeling of a private, high-end digital gym.

## Colors

The palette is anchored in a true black (`#000000`) to maximize the contrast ratio on OLED displays and provide a limitless sense of depth.

- **Primary (Volt):** `#CCFF00`. Used exclusively for critical calls-to-action, active progress states, and key performance metrics.
- **Surface (Elevated):** Subtle greys and semi-transparent layers are used to define interactive zones without breaking the dark immersion.
- **Glass Tint:** A white tint at 10% opacity is used for frosted glass backdrops, ensuring legibility over dynamic photographic content.

## Typography

This design system utilizes **Inter** for its modern, neutral, and highly legible characteristics. The type hierarchy emphasizes "Impact Metrics"—large, bold numerical data that can be read at a glance during high-intensity movement.

- **Display & Headlines:** Use heavy weights (700-800) with tight letter spacing to create a sense of strength and urgency.
- **Metrics:** Dedicated `metric-xl` style for heart rate, calories, and timers to ensure primary data points dominate the visual field.
- **Labels:** Uppercase tracking is applied to small labels to provide a technical, "instrument-panel" aesthetic.

## Layout & Spacing

The layout follows a fluid-to-fixed model designed primarily for iOS handheld devices. It utilizes a **4-column grid** for mobile and an **8-column grid** for tablet.

- **Safe Zones:** Adheres strictly to iOS safe areas, with a standard 20px horizontal margin for all primary content containers.
- **Vertical Rhythm:** Spacing is managed in multiples of 8px. Generous `section-gap` spacing (40px) is used between disparate content types (e.g., separating "Active Workout" from "Daily Goals") to maintain a premium, uncluttered feel.
- **Reflow:** On wider screens, cards reflow into a masonry or multi-column grid rather than stretching, preserving the aspect ratio of fitness photography.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and tonal stacking rather than traditional drop shadows.

- **Level 0 (Base):** Pure `#000000` background.
- **Level 1 (Cards):** Frosted glass surfaces using `backdrop-filter: blur(20px)` and a 10% white tint. These are finished with a 1px "inner-glow" border (White @ 15% opacity) to define edges against the black void.
- **Level 2 (Modals/Overlays):** Higher opacity glass (20% tint) with a more pronounced backdrop blur (40px) to indicate temporary, high-focus states.
- **Shadows:** Only used for the Primary "Volt" buttons, using a subtle, color-matched neon glow (`#CCFF00` @ 30% opacity) to simulate light emission.

## Shapes

The shape language is ultra-smooth and organic, mirroring the curves of the human body and modern sportswear. 

- **Primary Radius:** 24px (`rounded-xl`) is the standard for all dashboard cards and imagery containers.
- **Interactive Elements:** Buttons and input fields use the "Pill" shape (fully rounded) to maximize touch-target comfort and reinforce the friendly yet professional tone.
- **Data Visualizations:** Activity rings use heavy stroke weights with rounded end-caps.

## Components

### Buttons
- **Primary:** Pill-shaped, Background: `#CCFF00`, Text: `#000000` (Bold).
- **Secondary (Glass):** Pill-shaped, Background: White @ 10%, Backdrop-blur: 12px, Border: 1px White @ 20%.

### Cards (The "Glass" Container)
The core unit of the design system. Must include 24px corner radius and a subtle 1px border. Photography inside cards should use `multiply` or `overlay` gradients at the bottom to ensure text legibility.

### Progress Rings
Triple-concentric rings. The "Volt" ring always represents the primary goal. Background tracks are semi-transparent (10% opacity) versions of the foreground color.

### Charts
High-contrast line or bar charts. Use `#CCFF00` for the data line, with a subtle vertical gradient fill below the line (Volt to Transparent) to create a "holographic" effect.

### Input Fields
Minimalist pill shapes with a 10% white background. Active state is indicated by a 1px `#CCFF00` border and a matching glow effect.

### Selection Controls
- **Checkboxes/Radios:** Use the Primary Volt color for selected states.
- **Chips:** Highly rounded glass containers with `label-caps` typography for filtering workouts (e.g., "HIIT", "YOGA", "STRENGTH").