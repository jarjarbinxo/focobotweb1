# Focobot Landing Page — Rebuild Design Spec

## Overview

Full rebuild of `focobotweb1`. Replace the current messy multi-component codebase with a clean, simple, impressive light-theme landing page. Bilingual EN/AR with RTL support. No WebGL or heavy shaders.

## Visual Direction

- **Theme:** Clean Light — white background, `#ff7a1a` orange accent, dark text
- **Feel:** Professional SaaS, simple, high-converting — like Stripe or Linear but approachable
- **Typography:** Bold headlines, clean body text, generous whitespace
- **No:** shaders, particle effects, galaxy/aurora backgrounds, heavy animations

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- shadcn/ui (Button, Card, Accordion, Badge)
- Motion/react for scroll animations
- `useLang` hook — `Lang = 'en' | 'ar'`, RTL via `dir="rtl"` on root

## Page Sections (in order)

### 1. Navbar
- Logo (`FOCO` + `BOT` in orange), nav links, EN/AR toggle button, "Start Free" CTA button
- Sticky, minimal — white bg with subtle bottom border on scroll

### 2. Hero — Split Screen
- **Left:** Badge ("1 Week Free Trial"), bold headline, subtext, two CTAs (primary: "Start Free Trial", secondary: "See How It Works")
- **Right:** Animated WhatsApp chat mockup showing a bot conversation
- RTL: columns flip in Arabic

### 3. Stats Strip
- 4 numbers: 500+ Businesses, 10M+ Messages Sent, 4.9★ Average Rating, 24/7 Support
- Thin dividers between stats, subtle orange accent on numbers

### 4. Features
- 4 cards in a 2×2 grid (mobile: 1 col)
- Features: AI Auto-Reply, Order Management, Broadcast Campaigns, Analytics Dashboard
- Each card: icon + title + short description, subtle orange border-left accent

### 5. How It Works
- 3 steps: Connect WhatsApp → Set Up Your Bot → Go Live
- Horizontal on desktop, vertical on mobile
- Step numbers in orange circles, connected by a dashed line

### 6. Testimonials
- 3 customer quote cards in a row
- Name, role, company — clean minimal style, no avatars needed

### 7. Free Week Banner
- Full-width section with light orange background (`#fff8f3`)
- Headline: "Try Focobot Free for 7 Days"
- Subtext: "No credit card required. Cancel anytime."
- Single large CTA button

### 8. FAQ
- 5–6 questions using shadcn Accordion component
- Questions about: setup time, supported languages, WhatsApp approval, cancellation, data security, number of contacts

### 9. Footer
- Logo, nav links, social icons (WhatsApp, Instagram, Twitter), copyright, language toggle

## Bilingual (EN/AR)

- All copy stored in a `content.ts` file with `en` and `ar` keys — same structure as current `useLang` hook
- `dir="rtl"` applied to root div when `lang === 'ar'`
- Split hero columns reverse order in RTL
- All components receive `lang: Lang` prop

## Removed from Current Site

- ROI Calculator (too complex, low conversion)
- Live Demo (heavy, hard to maintain)
- Dashboard Preview (replaced by WhatsApp chat mockup in hero)
- Comparison table (simplify — not needed with clean positioning)
- SocialProofToast (noisy)
- Galaxy/Aurora/Hyperspeed shaders (not appropriate for light theme)

## File Structure

```
src/
  components/
    Navbar.tsx
    Hero.tsx
    StatsStrip.tsx
    Features.tsx
    HowItWorks.tsx
    Testimonials.tsx
    FreeWeekBanner.tsx
    FAQ.tsx
    Footer.tsx
  content.ts       ← all EN/AR copy
  hooks/
    useLang.ts
  App.tsx
```

## Success Criteria

- Looks clean and impressive on first scroll
- EN and AR both fully translated and RTL works
- shadcn components used for FAQ accordion and buttons
- No TypeScript errors
- Loads fast — no heavy WebGL contexts
