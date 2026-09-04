---
version: 2.0.0
name: Core 2.0 Dashboard
description: A modular dashboard builder interface utilizing high-contrast grayscale and glass-morphic elevation for complex data management.
colors:
  b-surface1: "#101010"
  b-surface2: "#191919"
  b-pop: "#222222"
  t-primary: "#F1F1F1"
  t-secondary: "#7B7B7B"
  t-tertiary: "#727272"
  primary-01: "#2A85FF"
  primary-02: "#00A656"
  primary-03: "#FF381C"
  secondary-01: "#FFBC99"
  secondary-04: "#B5E4CA"
  s-stroke2: "#282828"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: "1.1"
  h6:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "1.2"
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.5"
  button:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "1"
spacing:
  base: "4px"
  container: "20px"
  section-gap: "12px"
rounded:
  default: "8px"
  xl: "12px"
  "3xl": "24px"
  "4xl": "28px"
  full: "999px"
components:
  sidebar:
    background: "var(--b-surface1)"
    width: "272px"
  card:
    background: "var(--b-surface2)"
    rounded: "28px"
    padding: "12px"
  stat-pill:
    rounded: "8px"
    fontSize: "12px"
  nav-item:
    active-bg: "linear-gradient(to bottom, rgba(226,226,226,0.024), rgba(226,226,226,0.05))"
    radius: "12px"
motion:
  standard: "300ms cubic-bezier(0.4, 0, 0.2, 1)"
  hover: "200ms ease"
---

## Overview
Core 2.0 is a utility-first dashboard system designed for SaaS platforms requiring high information density without visual clutter. It relies on a structural hierarchy of surfaces, using deep blacks and charcoal grays to create focus on vibrant semantic indicators and metrics.

## Colors
The palette is rooted in a refined grayscale system from Shade-01 to Shade-10. Surface levels are defined as Surface 1 (Deepest), Surface 2 (Card Level), and Pop (Overlay Level). Primary Blue is used for actions, while Green and Red provide immediate status feedback for performance metrics.

## Typography
Inter is the primary typeface, optimized with tight tracking (-0.01em) for a modern feel. Type weights vary from Light (300) for large displays to Semibold (600) for labels. Hierarchy is established through stark grayscale contrast rather than just size.

## Spacing
The system operates on a 4px base grid. Common padding values include 12px for metric card interiors and 20px for global layout margins. Layout gaps between primary dashboard widgets are strictly set to 12px (3 units).

## Layout
The structure features a fixed left sidebar (17rem to 19rem) with a fluid content area. Content is further organized into a multi-column grid where the left column houses primary analytical data and the right column (when present) manages supplementary tools or social activity.

## Elevation & Depth
Depth is communicated through the 'depth' class which combines a subtle inner glow (inset 2px 4px 16px white at 0.05 opacity) with multi-layered drop shadows. This creates a tactile, glass-like appearance for interactive cards.

## Shapes
The system uses aggressive corner rounding. Standard metric cards use a 28px radius (rounded-4xl), while secondary interface buttons use a 24px or full pill-style radius to differentiate from the structural grid.

## Components
- Sidebar: Persistent navigation with nested accordion menus and a dark/light toggle.
- Metric Cards: Interactive blocks featuring a large h2 value, a solar icon, and a percentage trend pill.
- Chart Wrappers: Minimalist bar and line containers that use Shade-07 for non-active bars and Primary-02 for active states.
- Search Bar: Rounded-3xl input with a solar magnifier icon and subtle focus states.

## Motion
Micro-interactions include a 1.02x scale on button hover and a 4px vertical lift on card hover. Transitions for sidebar toggles and dropdowns are set to 300ms with a standard ease-in-out curve.

## Do's and Don'ts
- Do use high-contrast text (F1F1F1) for primary headings.
- Do use semantic background opacities (12%) for trend indicators.
- Don't use heavy solid borders; prefer the subtle stroke of var(--s-stroke2).
- Don't mix sharp corners with the 28px dashboard grid.

## Accessibility
- Use solar iconography alongside labels to ensure navigation is understood without text alone.
- Maintain a minimum 3:1 contrast ratio for secondary text labels (7B7B7B) against surface backgrounds.
- Interactive elements must show a visible 'depth' or color change on focus.