# Focobot Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade bilingual (EN/AR) landing page for Focobot — a WhatsApp AI bot platform for Kuwait small businesses.

**Architecture:** Single-page React app with a top-level language toggle (en/ar) that propagates via prop drilling. Each section is a standalone component importing its strings from a central copy.ts. RTL layout is applied by toggling `dir="rtl"` on `<html>` and swapping Inter → Tajawal font.

**Tech Stack:** React 19, Vite, Tailwind v4, Framer Motion (`motion` package), @splinetool/react-spline, lucide-react, TypeScript

---

## File Map

```
src/
  main.tsx                      — unchanged
  index.css                     — add Google Fonts import + RTL font rule
  App.tsx                       — REPLACE: language state, section composition
  data/
    copy.ts                     — CREATE: all EN/AR strings typed as LangCopy
    conversations.ts            — CREATE: chat demo data per business type
  hooks/
    useLang.ts                  — CREATE: lang state + RTL side-effect
  components/
    Navbar.tsx                  — CREATE
    Hero.tsx                    — CREATE (Spline 3D lazy-loaded)
    LiveDemo.tsx                — CREATE (animated phone chat)
    Features.tsx                — CREATE (6-card grid)
    HowItWorks.tsx              — CREATE (3 numbered steps)
    SocialProof.tsx             — CREATE (testimonial card)
    ROICalculator.tsx           — CREATE (2 inputs → loss dashboard)
    FAQ.tsx                     — CREATE (accordion)
    FinalCTA.tsx                — CREATE (dark banner)
```

---

## Task 1: Setup — clean src and update CSS

**Files:**
- Modify: `src/index.css`
- Delete contents of: `src/App.tsx` (will be replaced in Task 3)

- [ ] **Step 1: Update index.css** — add Google Fonts and RTL font rule

Replace entire `src/index.css` with:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap');

html, body {
  overscroll-behavior: none;
  background-color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
}

[dir="rtl"] {
  font-family: 'Tajawal', system-ui, sans-serif;
}

@theme {
  --color-orange: #ff7a1a;
  --color-orange-light: #fff5ee;
  --color-text: #111111;
  --color-muted: #888888;
}

* { box-sizing: border-box; }
```

- [ ] **Step 2: Verify dev server starts**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npm run dev
```
Expected: Vite ready on http://localhost:3000 (or next available port)

- [ ] **Step 3: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/index.css
git commit -m "feat: update css for bilingual font support"
```

---

## Task 2: Data layer — copy.ts

**Files:**
- Create: `src/data/copy.ts`

- [ ] **Step 1: Create src/data/copy.ts**

```typescript
export type Lang = 'en' | 'ar'

export interface LangCopy {
  nav: {
    home: string
    howItWorks: string
    features: string
    tryIt: string
    faq: string
    cta: string
  }
  hero: {
    badge: string
    headline: string
    sub: string
    pills: [string, string, string]
    stats: { value: string; label: string }[]
    cta: string
  }
  demo: {
    heading: string
    sub: string
    businessTypes: { id: string; label: string; emoji: string }[]
    whatsappLabel: string
  }
  features: {
    heading: string
    cards: { icon: string; title: string; desc: string }[]
  }
  howItWorks: {
    heading: string
    steps: { title: string; desc: string }[]
  }
  social: {
    heading: string
    quote: string
    author: string
  }
  roi: {
    heading: string
    sub: string
    stat: string
    ordersLabel: string
    avgLabel: string
    reportTitle: string
    reportSub: string
    cta: string
    ordersPlaceholder: string
    avgPlaceholder: string
  }
  faq: {
    heading: string
    items: { q: string; a: string }[]
  }
  finalCta: {
    heading: string
    sub: string
    urgency: string
    cta: string
  }
}

export const copy: Record<Lang, LangCopy> = {
  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How it works',
      features: 'Features',
      tryIt: 'Try it',
      faq: 'FAQ',
      cta: 'Try Free',
    },
    hero: {
      badge: '● AI-POWERED · WHATSAPP',
      headline: 'The AI employee\nthat never sleeps',
      sub: 'Replies to your customers in seconds — 24/7 in Arabic & English.\nNo extra staff. No delays. No missed orders.',
      pills: ['No extra staff', 'No delays', 'No missed orders'],
      stats: [
        { value: 'More Orders', label: 'every month' },
        { value: 'Less Time', label: 'on replies' },
        { value: 'Peace of Mind', label: '24/7' },
      ],
      cta: 'Try Free Now →',
    },
    demo: {
      heading: 'Try it yourself — see the difference',
      sub: 'Pick your business type 👇',
      businessTypes: [
        { id: 'cafe', label: 'Cafe', emoji: '☕' },
        { id: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
        { id: 'salon', label: 'Salon', emoji: '💇' },
        { id: 'bakery', label: 'Bakery', emoji: '🥐' },
        { id: 'gym', label: 'Gym', emoji: '💪' },
      ],
      whatsappLabel: 'WhatsApp',
    },
    features: {
      heading: 'Everything your business needs',
      cards: [
        { icon: '⚡', title: 'Instant Replies', desc: 'Under 3 seconds, always' },
        { icon: '🌍', title: 'Arabic + English', desc: 'Auto-detects language' },
        { icon: '🛒', title: 'Takes Orders', desc: 'Cart, delivery, checkout' },
        { icon: '🔔', title: 'Owner Alerts', desc: 'You get notified instantly' },
        { icon: '📊', title: 'Dashboard', desc: 'All chats in one place' },
        { icon: '⏰', title: '24/7 Active', desc: 'Never misses a message' },
      ],
    },
    howItWorks: {
      heading: 'Up and running in minutes',
      steps: [
        { title: 'Connect your WhatsApp', desc: 'Link your business number via Meta — takes 2 minutes' },
        { title: 'Train your bot', desc: 'Add your menu, FAQs, and business info' },
        { title: 'Go live & relax', desc: 'Bot handles everything. You get alerts for important stuff.' },
      ],
    },
    social: {
      heading: 'Kuwait businesses trust it',
      quote: '"The bot replies faster than any employee I\'ve had. Customers love it and our orders went up."',
      author: 'Al-Nasma Sweet 🍰 — Kuwait',
    },
    roi: {
      heading: 'How much are you losing right now?',
      sub: 'Answer 2 questions and see your number',
      stat: '~30% of customers don\'t wait more than 5 minutes for a reply',
      ordersLabel: 'Orders per day',
      avgLabel: 'Avg order value (KWD)',
      reportTitle: 'YOUR MONTHLY LOSS FROM SLOW REPLIES',
      reportSub: '~30% of customers leave if you don\'t reply within 5 minutes',
      cta: 'Stop losing money → Get Focobot Free',
      ordersPlaceholder: 'e.g. 20',
      avgPlaceholder: 'e.g. 5',
    },
    faq: {
      heading: 'Common questions',
      items: [
        { q: 'Do I need technical skills?', a: 'No. Setup takes 2 minutes, we handle everything.' },
        { q: 'Does it work in Arabic?', a: 'Yes — auto-detects Arabic or English and replies accordingly.' },
        { q: 'What if a customer asks something the bot can\'t answer?', a: 'It alerts you on your phone immediately so you can step in.' },
      ],
    },
    finalCta: {
      heading: "Don't let your customer go to someone else",
      sub: 'Every minute of delay = a lost opportunity',
      urgency: 'Try it now — no card, no commitment',
      cta: 'Start Free →',
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      howItWorks: 'كيف يشتغل',
      features: 'المميزات',
      tryIt: 'جرّب بنفسك',
      faq: 'الأسئلة الشائعة',
      cta: 'جرّب مجاناً',
    },
    hero: {
      badge: '● واتساب · ذكاء اصطناعي',
      headline: 'موظفك الذكي…\nما ينام ولا يتأخر',
      sub: 'يرد على عملاءك خلال ثواني — 24/7 بالعربي والإنجليزي',
      pills: ['بدون موظفين زيادة', 'بدون تأخير', 'بدون ما تفوّت طلبات'],
      stats: [
        { value: 'طلبات أكثر', label: 'كل شهر' },
        { value: 'وقت أقل', label: 'على الردود' },
        { value: 'راحة بالك أعلى', label: '24/7' },
      ],
      cta: '👉 جرّب مجاناً الحين',
    },
    demo: {
      heading: 'جرّبه بنفسك وشوف الفرق',
      sub: 'اختار نوع مشروعك 👇',
      businessTypes: [
        { id: 'cafe', label: 'كافيه', emoji: '☕' },
        { id: 'restaurant', label: 'مطعم', emoji: '🍽️' },
        { id: 'salon', label: 'صالون', emoji: '💇' },
        { id: 'bakery', label: 'مخبز', emoji: '🥐' },
        { id: 'gym', label: 'جيم', emoji: '💪' },
      ],
      whatsappLabel: 'واتساب',
    },
    features: {
      heading: 'كل شي يحتاجه مشروعك',
      cards: [
        { icon: '⚡', title: 'رد سريع', desc: 'أقل من 3 ثواني دايمًا' },
        { icon: '🌍', title: 'عربي + إنجليزي', desc: 'يكتشف اللغة تلقائياً' },
        { icon: '🛒', title: 'يستقبل طلبات', desc: 'سلة + توصيل + دفع' },
        { icon: '🔔', title: 'تنبيهات فورية', desc: 'تتنبّه عند الأهمية' },
        { icon: '📊', title: 'لوحة تحكم', desc: 'كل المحادثات بمكان واحد' },
        { icon: '⏰', title: 'شغال 24/7', desc: 'ما يفوّت أي رسالة' },
      ],
    },
    howItWorks: {
      heading: 'يشتغل خلال دقايق',
      steps: [
        { title: 'اربط واتسابك', desc: 'نربط رقمك التجاري بسهولة — يأخذ دقيقتين' },
        { title: 'علّم البوت', desc: 'حط المنيو والأسئلة ومعلوماتك' },
        { title: 'خلّه يشتغل', desc: 'يرد ويبيع بدالك… وأنت ترتاح' },
      ],
    },
    social: {
      heading: 'أصحاب المشاريع بالكويت يثقون فيه',
      quote: '"من يوم شغلناه، الرد صار أسرع وطلباتنا زادت بشكل واضح."',
      author: 'النسمة سويت 🍰',
    },
    roi: {
      heading: 'تدري جم قاعد تخسر؟',
      sub: 'جاوب سؤالين وشوف رقمك',
      stat: 'أغلب العملاء ما ينطرون أكثر من 5 دقايق ⏳ — يعني أي تأخير = فلوس طايرة',
      ordersLabel: 'طلبات باليوم',
      avgLabel: 'متوسط الطلب (د.ك)',
      reportTitle: 'خسارتك الشهرية من التأخر في الرد',
      reportSub: '📉 تقريباً 30% من الطلبات تضيع بس لأن ما في رد سريع',
      cta: '👉 وقف الخسارة وجرّب الحين',
      ordersPlaceholder: 'مثال: 20',
      avgPlaceholder: 'مثال: 5',
    },
    faq: {
      heading: 'الأسئلة الشائعة',
      items: [
        { q: 'أحتاج خبرة تقنية؟', a: 'لا — كل شي سهل ويخلص بدقايق' },
        { q: 'يفهم عربي؟', a: 'إي، يفهم ويرد بالعربي والإنجليزي تلقائي' },
        { q: 'لو سأل العميل شي ما يعرفه؟', a: 'يوصلك تنبيه فوراً عشان تدخل' },
      ],
    },
    finalCta: {
      heading: 'لا تخلي عميلك يروح لغيرك',
      sub: 'كل دقيقة تأخير = فرصة ضايعة',
      urgency: '🔥 جرّبه الحين — بدون بطاقة، بدون التزام',
      cta: '👉 ابدأ مجاناً',
    },
  },
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/data/copy.ts
git commit -m "feat: add bilingual copy data"
```

---

## Task 3: Data layer — conversations.ts

**Files:**
- Create: `src/data/conversations.ts`

- [ ] **Step 1: Create src/data/conversations.ts**

```typescript
import type { Lang } from './copy'

export interface Message {
  from: 'customer' | 'bot'
  text: string
}

export interface BusinessConvo {
  id: string
  nameEn: string
  nameAr: string
  messages: Record<Lang, Message[]>
}

export const conversations: BusinessConvo[] = [
  {
    id: 'cafe',
    nameEn: 'Sunrise Café',
    nameAr: 'كافيه الشروق',
    messages: {
      en: [
        { from: 'customer', text: 'Do you have cold coffee?' },
        { from: 'bot', text: 'Yes! We have cold brew and iced latte ☕ Want me to place an order?' },
      ],
      ar: [
        { from: 'customer', text: 'عندكم قهوة باردة؟' },
        { from: 'bot', text: 'إي عندنا كولد برو وأيس لاتيه ☕ تبي أطلب لك؟' },
      ],
    },
  },
  {
    id: 'restaurant',
    nameEn: 'Zara Kitchen',
    nameAr: 'مطبخ زارا',
    messages: {
      en: [
        { from: 'customer', text: 'I want to book a table for 4 tonight' },
        { from: 'bot', text: '8PM is available for 4. Confirm the booking?' },
        { from: 'customer', text: 'Yes' },
        { from: 'bot', text: 'Booked! ✅ See you at 8PM 🙏' },
      ],
      ar: [
        { from: 'customer', text: 'أبي أحجز طاولة لـ4 اليوم' },
        { from: 'bot', text: 'تمام، الساعة 8 متوفرة. أأكّد الحجز؟' },
        { from: 'customer', text: 'إي' },
        { from: 'bot', text: 'تم الحجز ✅ نشوفكم 🙏' },
      ],
    },
  },
  {
    id: 'salon',
    nameEn: 'Glow Studio',
    nameAr: 'جلو ستوديو',
    messages: {
      en: [
        { from: 'customer', text: 'How much is a haircut?' },
        { from: 'bot', text: 'Men from 8 KWD, women from 15 💇 Want to book?' },
        { from: 'customer', text: 'Tomorrow at 3' },
        { from: 'bot', text: 'Done! Your appointment is confirmed for tomorrow at 3PM 🙏' },
      ],
      ar: [
        { from: 'customer', text: 'بجم قصة الشعر؟' },
        { from: 'bot', text: 'للرجال من 8 دنانير، للحريم من 15 💇 تبين تحجزين؟' },
        { from: 'customer', text: 'باچر الساعة 3' },
        { from: 'bot', text: 'تمام، حجزج مؤكد 🙏' },
      ],
    },
  },
  {
    id: 'bakery',
    nameEn: 'Sweet Layers',
    nameAr: 'طبقات حلوة',
    messages: {
      en: [
        { from: 'customer', text: 'Do you deliver?' },
        { from: 'bot', text: 'Yes! Within Kuwait 🚚 Free delivery over 15 KWD. Want to order?' },
      ],
      ar: [
        { from: 'customer', text: 'توصلون؟' },
        { from: 'bot', text: 'إي نوصل داخل الكويت 🚚 التوصيل مجاني فوق 15 دينار، تبي تطلب؟' },
      ],
    },
  },
  {
    id: 'gym',
    nameEn: 'Iron Zone',
    nameAr: 'زون الحديد',
    messages: {
      en: [
        { from: 'customer', text: 'How much is a monthly membership?' },
        { from: 'bot', text: '35 KWD/month or 90 for 3 months 💪 Want to sign up?' },
      ],
      ar: [
        { from: 'customer', text: 'الاشتراك بجم؟' },
        { from: 'bot', text: '35 دينار بالشهر أو 90 لـ3 شهور 💪 تبي تسجل؟' },
      ],
    },
  },
]
```

- [ ] **Step 2: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/data/conversations.ts
git commit -m "feat: add demo conversation data"
```

---

## Task 4: useLang hook

**Files:**
- Create: `src/hooks/useLang.ts`

- [ ] **Step 1: Create src/hooks/useLang.ts**

```typescript
import { useState, useEffect } from 'react'
import type { Lang } from '../data/copy'

export function useLang() {
  const [lang, setLang] = useState<Lang>('ar')

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang(l => l === 'en' ? 'ar' : 'en')

  return { lang, toggle }
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/hooks/useLang.ts
git commit -m "feat: add useLang hook with RTL side effect"
```

---

## Task 5: App.tsx shell + Navbar

**Files:**
- Replace: `src/App.tsx`
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create src/components/Navbar.tsx**

```tsx
import { copy, type Lang } from '../data/copy'

interface NavbarProps {
  lang: Lang
  onToggleLang: () => void
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = copy[lang].nav
  const isAr = lang === 'ar'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-black text-xl tracking-tight text-gray-900">
          FOCO<span className="text-[#ff7a1a]">BOT</span>
        </a>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">{t.howItWorks}</a>
          <a href="#features" className="hover:text-gray-900 transition-colors">{t.features}</a>
          <a href="#demo" className="hover:text-gray-900 transition-colors">{t.tryIt}</a>
          <a href="#faq" className="hover:text-gray-900 transition-colors">{t.faq}</a>
        </div>

        {/* Right side */}
        <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={onToggleLang}
            className="text-sm font-bold text-[#ff7a1a] border border-[#ff7a1a] px-3 py-1.5 rounded-full hover:bg-[#fff5ee] transition-colors"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <a
            href="#roi"
            className="bg-[#ff7a1a] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#e86d10] transition-colors"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Replace src/App.tsx with shell**

```tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'

export default function App() {
  const { lang, toggle } = useLang()

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} onToggleLang={toggle} />
      <main className="pt-16">
        <div className="h-screen flex items-center justify-center text-gray-400">
          Building sections...
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser** — open dev server, check navbar renders, AR/EN toggle switches text and flips direction

- [ ] **Step 4: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/App.tsx src/components/Navbar.tsx
git commit -m "feat: add navbar with lang toggle"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/Hero.tsx**

```tsx
import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { copy, type Lang } from '../data/copy'

const Spline = lazy(() => import('@splinetool/react-spline'))
const SPLINE_SCENE = 'https://prod.spline.design/xSzSYlmxGz4BsQ5d/scene.splinecode'

interface HeroProps { lang: Lang }

export default function Hero({ lang }: HeroProps) {
  const t = copy[lang].hero
  const isAr = lang === 'ar'

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-white pt-16">
      {/* Subtle orange glow top right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7a1a] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className={`flex flex-col md:flex-row items-center gap-12 ${isAr ? 'md:flex-row-reverse' : ''}`}>

          {/* Text side */}
          <div className="flex-1 text-center md:text-start" style={{ textAlign: isAr ? 'right' : 'left' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-black tracking-widest text-[#ff7a1a] mb-4">
                {t.badge}
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] mb-6 whitespace-pre-line">
                {t.headline}
              </h1>

              <p className="text-lg text-gray-500 mb-8 whitespace-pre-line leading-relaxed max-w-lg">
                {t.sub}
              </p>

              {/* Pills */}
              <div className={`flex flex-wrap gap-2 mb-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
                {t.pills.map((pill) => (
                  <span
                    key={pill}
                    className="bg-[#fff5ee] text-[#ff7a1a] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#ff7a1a22]"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className={`flex gap-8 mb-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
                {t.stats.map((stat) => (
                  <div key={stat.value} style={{ textAlign: isAr ? 'right' : 'left' }}>
                    <div className="text-2xl font-black text-[#ff7a1a]">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <a
                href="#roi"
                className="inline-block bg-[#ff7a1a] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#e86d10] transition-all hover:scale-105 shadow-lg shadow-orange-200"
              >
                {t.cta}
              </a>
            </motion.div>
          </div>

          {/* Spline 3D */}
          <div className="flex-1 w-full h-[500px] relative">
            <Suspense fallback={
              <div className="w-full h-full bg-[#fff5ee] rounded-3xl flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#ff7a1a] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Spline scene={SPLINE_SCENE} className="w-full h-full" />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to App.tsx**

```tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  const { lang, toggle } = useLang()

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} onToggleLang={toggle} />
      <main className="pt-16">
        <Hero lang={lang} />
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify** — hero renders, Spline loads (may take a few seconds), headline switches between EN/AR on toggle

- [ ] **Step 4: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: add hero section with Spline 3D"
```

---

## Task 7: Live Demo section

**Files:**
- Create: `src/components/LiveDemo.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/LiveDemo.tsx**

```tsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { copy, type Lang } from '../data/copy'
import { conversations } from '../data/conversations'

interface LiveDemoProps { lang: Lang }

export default function LiveDemo({ lang }: LiveDemoProps) {
  const t = copy[lang].demo
  const isAr = lang === 'ar'
  const [activeId, setActiveId] = useState('cafe')
  const [visibleCount, setVisibleCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const convo = conversations.find(c => c.id === activeId)!
  const messages = convo.messages[lang]

  useEffect(() => {
    setVisibleCount(0)
    if (timerRef.current) clearInterval(timerRef.current)
    let i = 0
    timerRef.current = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= messages.length && timerRef.current) {
        clearInterval(timerRef.current)
      }
    }, 900)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [activeId, lang])

  const businessName = lang === 'ar' ? convo.nameAr : convo.nameEn

  return (
    <section id="demo" className="py-28 bg-[#fafafa] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">{t.heading}</h2>
          <p className="text-gray-500 text-lg">{t.sub}</p>
        </div>

        {/* Business type tabs */}
        <div className={`flex flex-wrap gap-2 justify-center mb-10`}>
          {t.businessTypes.map((bt) => (
            <button
              key={bt.id}
              onClick={() => setActiveId(bt.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeId === bt.id
                  ? 'bg-[#ff7a1a] text-white shadow-md shadow-orange-200'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#ff7a1a] hover:text-[#ff7a1a]'
              }`}
            >
              <span>{bt.emoji}</span>
              <span>{bt.label}</span>
            </button>
          ))}
        </div>

        {/* Phone mockup */}
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            {/* WhatsApp header */}
            <div className="bg-[#075E54] px-5 py-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center text-white text-lg">
                💬
              </div>
              <div>
                <div className="text-white font-bold text-sm">{businessName}</div>
                <div className="text-green-200 text-xs">online</div>
              </div>
            </div>

            {/* Messages */}
            <div
              className="p-4 min-h-[220px] bg-[#e5ddd5] flex flex-col gap-3"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23c8b99a\' fill-opacity=\'0.1\'%3E%3Crect width=\'1\' height=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }}
            >
              <AnimatePresence>
                {messages.slice(0, visibleCount).map((msg, i) => (
                  <motion.div
                    key={`${activeId}-${lang}-${i}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.from === 'bot' ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.from === 'bot'
                          ? 'bg-[#ff7a1a] text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                      }`}
                      style={{ direction: isAr ? 'rtl' : 'ltr' }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {visibleCount < messages.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex ${isAr ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="bg-[#ff7a1a] px-4 py-3 rounded-2xl flex gap-1 items-center">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add LiveDemo to App.tsx**

```tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LiveDemo from './components/LiveDemo'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} onToggleLang={toggle} />
      <main className="pt-16">
        <Hero lang={lang} />
        <LiveDemo lang={lang} />
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify** — tabs switch business type, messages animate in one by one, typing indicator shows

- [ ] **Step 4: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/LiveDemo.tsx src/App.tsx
git commit -m "feat: add live demo section with animated chat"
```

---

## Task 8: Features section

**Files:**
- Create: `src/components/Features.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/Features.tsx**

```tsx
import { motion } from 'motion/react'
import { copy, type Lang } from '../data/copy'

interface FeaturesProps { lang: Lang }

export default function Features({ lang }: FeaturesProps) {
  const t = copy[lang].features

  return (
    <section id="features" className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">{t.heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {t.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#fff5ee] rounded-2xl p-6 hover:shadow-md transition-shadow group"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <div className="font-bold text-gray-900 mb-1 group-hover:text-[#ff7a1a] transition-colors">
                {card.title}
              </div>
              <div className="text-sm text-gray-500">{card.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Features to App.tsx** — append `<Features lang={lang} />` after `<LiveDemo />`, add import

- [ ] **Step 3: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/Features.tsx src/App.tsx
git commit -m "feat: add features section"
```

---

## Task 9: How It Works section

**Files:**
- Create: `src/components/HowItWorks.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/HowItWorks.tsx**

```tsx
import { motion } from 'motion/react'
import { copy, type Lang } from '../data/copy'

interface HowItWorksProps { lang: Lang }

export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = copy[lang].howItWorks
  const isAr = lang === 'ar'

  return (
    <section id="how-it-works" className="py-28 bg-[#fafafa] border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">{t.heading}</h2>
        </div>
        <div className="flex flex-col gap-0">
          {t.steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`flex gap-6 items-start ${isAr ? 'flex-row-reverse text-right' : ''} relative pb-10 last:pb-0`}
            >
              {/* Vertical line */}
              {i < t.steps.length - 1 && (
                <div
                  className={`absolute top-10 w-0.5 bg-[#ff7a1a22] h-full ${isAr ? 'right-5' : 'left-5'}`}
                />
              )}
              {/* Number bubble */}
              <div className="w-10 h-10 bg-[#ff7a1a] rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md shadow-orange-200">
                {i + 1}
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900 mb-1">{step.title}</div>
                <div className="text-gray-500">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add HowItWorks to App.tsx** — append after `<Features />`, add import

- [ ] **Step 3: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/HowItWorks.tsx src/App.tsx
git commit -m "feat: add how it works section"
```

---

## Task 10: Social Proof section

**Files:**
- Create: `src/components/SocialProof.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/SocialProof.tsx**

```tsx
import { motion } from 'motion/react'
import { copy, type Lang } from '../data/copy'

interface SocialProofProps { lang: Lang }

export default function SocialProof({ lang }: SocialProofProps) {
  const t = copy[lang].social

  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">{t.heading}</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#fff5ee] rounded-3xl p-10 border-l-4 border-[#ff7a1a] relative"
          style={{ borderLeft: lang === 'ar' ? 'none' : undefined, borderRight: lang === 'ar' ? '4px solid #ff7a1a' : undefined }}
        >
          <div className="text-5xl text-[#ff7a1a] opacity-30 font-black leading-none mb-4">"</div>
          <p className="text-2xl font-medium text-gray-800 leading-relaxed mb-6" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
            {t.quote}
          </p>
          <div className="font-bold text-[#ff7a1a]">{t.author}</div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add SocialProof to App.tsx** — append after `<HowItWorks />`, add import

- [ ] **Step 3: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/SocialProof.tsx src/App.tsx
git commit -m "feat: add social proof section"
```

---

## Task 11: ROI Calculator (Hormozi-style)

**Files:**
- Create: `src/components/ROICalculator.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/ROICalculator.tsx**

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { copy, type Lang } from '../data/copy'

interface ROICalculatorProps { lang: Lang }

export default function ROICalculator({ lang }: ROICalculatorProps) {
  const t = copy[lang].roi
  const isAr = lang === 'ar'
  const [orders, setOrders] = useState('')
  const [avg, setAvg] = useState('')

  const loss = orders && avg
    ? Math.round(Number(orders) * Number(avg) * 0.30 * 30)
    : null

  return (
    <section id="roi" className="py-28 bg-[#fff5ee] border-t border-[#ff7a1a22]">
      <div className="max-w-2xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">{t.heading}</h2>
          <p className="text-gray-500 text-lg">{t.sub}</p>
          <p className="text-sm text-gray-400 mt-2">{t.stat}</p>
        </div>

        {/* Inputs */}
        <div className={`grid grid-cols-2 gap-4 mb-8 ${isAr ? 'direction-rtl' : ''}`}>
          <div style={{ textAlign: isAr ? 'right' : 'left' }}>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.ordersLabel}</label>
            <input
              type="number"
              min="0"
              value={orders}
              onChange={e => setOrders(e.target.value)}
              placeholder={t.ordersPlaceholder}
              className="w-full border-2 border-[#ff7a1a] rounded-xl px-4 py-3 text-lg font-bold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7a1a44]"
              style={{ direction: 'ltr' }}
            />
          </div>
          <div style={{ textAlign: isAr ? 'right' : 'left' }}>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.avgLabel}</label>
            <input
              type="number"
              min="0"
              value={avg}
              onChange={e => setAvg(e.target.value)}
              placeholder={t.avgPlaceholder}
              className="w-full border-2 border-[#ff7a1a] rounded-xl px-4 py-3 text-lg font-bold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7a1a44]"
              style={{ direction: 'ltr' }}
            />
          </div>
        </div>

        {/* Results dashboard */}
        <AnimatePresence>
          {loss !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 shadow-xl mb-8 border border-gray-100"
            >
              <div className="text-xs font-black tracking-widest text-gray-400 mb-6 uppercase" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                {t.reportTitle}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#fafafa] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-gray-900">{orders}</div>
                  <div className="text-xs text-gray-400 mt-1">{t.ordersLabel}</div>
                </div>
                <div className="bg-[#fafafa] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-gray-900">{avg} KWD</div>
                  <div className="text-xs text-gray-400 mt-1">{t.avgLabel}</div>
                </div>
              </div>

              {/* Loss number */}
              <div className="text-center py-6 border-t border-b border-gray-100 mb-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-6xl font-black text-red-500 mb-2"
                >
                  -{loss} KWD
                </motion.div>
                <div className="text-sm text-gray-400">{t.reportSub}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center">
          <a
            href="mailto:hello@focobot.com"
            className="inline-block bg-[#ff7a1a] text-white font-black text-xl px-10 py-5 rounded-2xl hover:bg-[#e86d10] transition-all hover:scale-105 shadow-xl shadow-orange-200"
          >
            {t.cta}
          </a>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add ROICalculator to App.tsx** — append after `<SocialProof />`, add import

- [ ] **Step 3: Verify** — type numbers in inputs, results card animates in with red loss number

- [ ] **Step 4: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/ROICalculator.tsx src/App.tsx
git commit -m "feat: add ROI calculator with loss dashboard"
```

---

## Task 12: FAQ section

**Files:**
- Create: `src/components/FAQ.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/FAQ.tsx**

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { copy, type Lang } from '../data/copy'

interface FAQProps { lang: Lang }

export default function FAQ({ lang }: FAQProps) {
  const t = copy[lang].faq
  const [open, setOpen] = useState<number | null>(null)
  const isAr = lang === 'ar'

  return (
    <section id="faq" className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">{t.heading}</h2>
        </div>
        <div className="flex flex-col gap-3">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-[#ff7a1a44] transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full px-6 py-5 text-left font-bold text-gray-900 flex items-center justify-between gap-4 ${isAr ? 'flex-row-reverse text-right' : ''}`}
              >
                <span>{item.q}</span>
                <span className={`text-[#ff7a1a] text-xl transition-transform duration-200 flex-shrink-0 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p
                      className={`px-6 pb-5 text-gray-500 leading-relaxed ${isAr ? 'text-right' : ''}`}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add FAQ to App.tsx** — append after `<ROICalculator />`, add import

- [ ] **Step 3: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/FAQ.tsx src/App.tsx
git commit -m "feat: add FAQ accordion section"
```

---

## Task 13: Final CTA section

**Files:**
- Create: `src/components/FinalCTA.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/FinalCTA.tsx**

```tsx
import { motion } from 'motion/react'
import { copy, type Lang } from '../data/copy'

interface FinalCTAProps { lang: Lang }

export default function FinalCTA({ lang }: FinalCTAProps) {
  const t = copy[lang].finalCta

  return (
    <section className="py-32 bg-gray-950 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-[#ff7a1a] opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {t.heading}
          </h2>
          <p className="text-xl text-gray-400 mb-3">{t.sub}</p>
          <p className="text-lg text-[#ff7a1a] font-semibold mb-10">{t.urgency}</p>
          <a
            href="mailto:hello@focobot.com"
            className="inline-block bg-[#ff7a1a] text-white font-black text-xl px-12 py-5 rounded-2xl hover:bg-[#e86d10] transition-all hover:scale-105 shadow-2xl shadow-orange-900"
          >
            {t.cta}
          </a>
          <p className="text-gray-600 text-sm mt-6">No credit card · No commitment</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-black text-xl text-white">
          FOCO<span className="text-[#ff7a1a]">BOT</span>
        </div>
        <p className="text-gray-500 text-sm">© 2026 Focobot. All rights reserved.</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Final App.tsx — complete version**

```tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LiveDemo from './components/LiveDemo'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import SocialProof from './components/SocialProof'
import ROICalculator from './components/ROICalculator'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'

export default function App() {
  const { lang, toggle } = useLang()

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} onToggleLang={toggle} />
      <main className="pt-16">
        <Hero lang={lang} />
        <LiveDemo lang={lang} />
        <Features lang={lang} />
        <HowItWorks lang={lang} />
        <SocialProof lang={lang} />
        <ROICalculator lang={lang} />
        <FAQ lang={lang} />
        <FinalCTA lang={lang} />
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify full page** — scroll through all sections, test EN/AR toggle on each, test ROI calculator, test FAQ accordion

- [ ] **Step 4: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/FinalCTA.tsx src/App.tsx
git commit -m "feat: add final CTA and complete page"
```

---

## Task 14: Build and verify

**Files:** none

- [ ] **Step 1: Run build**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npm run build
```
Expected: `dist/` folder created, no TypeScript errors

- [ ] **Step 2: Preview the build**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npm run preview
```
Expected: site works on preview URL, Spline loads, all sections render

- [ ] **Step 3: Final commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add -A
git commit -m "feat: focobot landing page complete"
```

- [ ] **Step 4: Deploy to Cloudflare Pages**
  - Go to Cloudflare Dashboard → Pages → Create project → Upload assets
  - Drag the `dist/` folder
  - Add custom domain `focobot.com`
