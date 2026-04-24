# Focobot Landing Page — Design Spec
Date: 2026-04-20

## Overview
Rebuild focobot.com landing page from scratch. Marketing site for a WhatsApp AI bot platform targeting Kuwait/Gulf small business owners (cafes, restaurants, salons, bakeries, gyms).

## Tech Stack
- React 19 + Vite + Tailwind v4
- Framer Motion (animations)
- @splinetool/react-spline (3D hero scene)
- Bilingual EN/AR with toggle (RTL support for Arabic)
- Deploy: `vite build` → `dist/` → Cloudflare Pages → focobot.com

## Brand
- Primary: #ff7a1a (orange)
- Theme: Light (white backgrounds, NOT dark)
- Style: Bold & Minimal — clean white, big typography, premium SaaS feel
- Font: Inter (EN), Tajawal (AR)

## Sections (in order)
1. **Navbar** — Logo, nav links, AR/EN toggle, CTA button
2. **Hero** — Bold headline, subheadline, 3 stat pills, Spline 3D phone scene, CTA button
3. **Live Demo** — Business type selector (cafe/restaurant/salon/bakery/gym), animated phone chat
4. **Features** — 6 cards in 2-col grid with icons
5. **How It Works** — 3 numbered steps
6. **Social Proof** — Al-Nasma Sweet testimonial card
7. **ROI Calculator** — 2 inputs → business report dashboard with red loss number → free trial CTA
8. **FAQ** — 3 accordion items
9. **Final CTA** — Dark section, bold headline, free trial button

## ROI Calculator Logic
- loss = ordersPerDay × avgOrder × 0.30 × 30
- Displays as "−X KWD" in red
- Stat: ~30% of customers don't wait >5 mins for a reply

## Copy (EN/AR)

### NAV
- EN: Home · How it works · Features · Try it · FAQ | Try Free
- AR: الرئيسية · كيف يشتغل · المميزات · جرّب بنفسك · الأسئلة الشائعة | جرّب مجاناً

### HERO
- EN: "The AI employee that never sleeps" / "Replies to your customers in seconds — 24/7 in Arabic & English. No extra staff. No delays. No missed orders." / Stats: More Orders · Less Time · Peace of Mind / CTA: Try Free Now →
- AR: "موظفك الذكي… ما ينام ولا يتأخر" / "يرد على عملاءك خلال ثواني — 24/7 بالعربي والإنجليزي / بدون موظفين زيادة · بدون تأخير · بدون ما تفوّت طلبات" / Stats: طلبات أكثر · وقت أقل · راحة بالك أعلى / CTA: 👉 جرّب مجاناً الحين

### DEMO
- EN: "Try it yourself — pick your business type"
- AR: "جرّبه بنفسك وشوف الفرق / اختار نوع مشروعك 👇"
- Business types: Cafe/كافيه · Restaurant/مطعم · Salon/صالون · Bakery/مخبز · Gym/جيم
- Conversations: (see Focobot Website.md for all Arabic chat lines)

### FEATURES
- EN: "Everything your business needs"
- AR: "كل شي يحتاجه مشروعك"
- Cards: ⚡ Instant Replies / 🌍 Arabic+English / 🛒 Takes Orders / 🔔 Owner Alerts / 📊 Dashboard / ⏰ 24/7 Active

### HOW IT WORKS
- EN: "Up and running in minutes" — 3 steps
- AR: "يشتغل خلال دقايق" — اربط واتسابك / علّم البوت / خلّه يشتغل

### SOCIAL PROOF
- EN: "Kuwait businesses trust it" / "The bot replies faster than any employee I've had..."
- AR: "أصحاب المشاريع بالكويت يثقون فيه" / "من يوم شغلناه، الرد صار أسرع وطلباتنا زادت بشكل واضح." — النسمة سويت 🍰

### ROI CALCULATOR
- EN: "How much are you losing right now?" / inputs: Orders per day · Avg order (KWD)
- AR: "تدري جم قاعد تخسر؟" / طلبات باليوم · متوسط الطلب (د.ك)
- Result card shows: daily orders, avg order, monthly loss in red
- CTA EN: "Stop losing money → Get Focobot Free"
- CTA AR: "👉 وقف الخسارة وجرّب الحين"

### FAQ
- EN/AR: 3 items (technical skills, Arabic support, escalation)

### FINAL CTA
- EN: "Don't let your customer go to someone else" / "Every minute of delay = a lost opportunity" / "Try it now — no card, no commitment"
- AR: "لا تخلي عميلك يروح لغيرك" / "كل دقيقة تأخير = فرصة ضايعة" / "🔥 جرّبه الحين — بدون بطاقة، بدون التزام" / "👉 ابدأ مجاناً"

## File Structure
```
src/
  App.tsx           — main page, lang state, section composition
  components/
    Navbar.tsx
    Hero.tsx
    LiveDemo.tsx
    Features.tsx
    HowItWorks.tsx
    SocialProof.tsx
    ROICalculator.tsx
    FAQ.tsx
    FinalCTA.tsx
  data/
    copy.ts         — all EN/AR strings
    conversations.ts — demo chat data per business type
  hooks/
    useLang.ts      — language toggle state
```
