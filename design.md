---
name: IP-SAKTI Sahayak
colors:
  surface: '#F7F4EC'
  surface-dim: '#E5E2D9'
  surface-bright: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F3F0E6'
  surface-container: '#F1EDE2'
  surface-container-high: '#EBE7DC'
  surface-container-highest: '#E5E1D5'
  on-surface: '#1F2933'
  on-surface-variant: '#667085'
  outline: '#A1A9B8'
  outline-variant: '#D1D5DB'
  primary: '#123C32'
  on-primary: '#FFFFFF'
  primary-container: '#D1E7E2'
  on-primary-container: '#0A241E'
  secondary: '#172A46'
  on-secondary: '#FFFFFF'
  secondary-container: '#D1D9E6'
  on-secondary-container: '#0C1625'
  tertiary: '#C58B2A'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#F5E6CC'
  on-tertiary-container: '#2B1E09'
  error: '#BA1A1A'
  on-error: '#FFFFFF'
  error-container: '#FFDAD6'
  on-error-container: '#410002'
  success: '#176B5B'
  on-success: '#FFFFFF'
  success-container: '#D1EDE8'
  on-success-container: '#0B332B'
typography:
  font-family-headline: 'DM Serif Display, serif'
  font-family-body: 'Inter, sans-serif'
  headline-lg: '400 48px/56px DM Serif Display'
  headline-md: '400 32px/40px DM Serif Display'
  headline-sm: '400 24px/32px DM Serif Display'
  title-lg: '600 22px/28px Inter'
  title-md: '600 16px/24px Inter'
  title-sm: '600 14px/20px Inter'
  body-lg: '400 16px/24px Inter'
  body-md: '400 14px/20px Inter'
  body-sm: '400 12px/16px Inter'
  label-lg: '500 14px/20px Inter'
  label-md: '500 12px/16px Inter'
spacing:
  gutter: 24px
  container-padding: 32px
  card-gap: 16px
  section-gap: 64px
roundness:
  none: 0px
  small: 4px
  medium: 12px
  large: 16px
  full: 9999px
effects:
  shadow-sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  shadow-md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
---

# IP-SAKTI Sahayak Design System

## Overview
A "Source-First" legal-tech aesthetic that balances Ayurvedic heritage with modern AI authority. The system is designed for practitioners, researchers, and IP professionals navigating complex regulatory landscapes.

## Visual Principles
- **Authority & Trust:** Serif headlines evoke legal documents and traditional texts.
- **Traceability:** Prominent citation styles and confidence indicators.
- **Jurisdiction Clarity:** Context-aware color shifts (Green for India, Navy for International).
- **Subtle Heritage:** Minimal botanical motifs and saffron accents without over-decoration.

## Core Components

### 1. Jurisdiction Toggle
High-visibility switch that changes the application's primary context and secondary color scheme.
- **India State:** Uses Primary Green (#123C32).
- **International State:** Uses Secondary Navy (#172A46).

### 2. Research Cards
Used for capability areas and saved research.
- **Border:** 1px solid `outline-variant`.
- **Background:** `surface-container-lowest`.
- **Radius:** `large` (16px).

### 3. AI Research Answer
Structured output container that separates conclusions from reasoning and citations.
- **Confidence Badge:** Muted colors to avoid "red/green" alarmist states.
- **Source Ribbon:** Horizontal list of clickable citations.

### 4. Source Panel
Right-side drawer for deep-dives into cited legal provisions.
- **Type Badges:** Statute, Case Law, Guideline, or Traditional Text.
