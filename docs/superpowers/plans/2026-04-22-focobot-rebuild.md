# Focobot Landing Page Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild focobotweb1 as a clean, simple, impressive white-theme landing page for Focobot — bilingual EN/AR, 9 sections, no WebGL.

**Architecture:** Each section is a standalone component receiving `lang: Lang`. All copy lives in `src/data/copy.ts`. `App.tsx` composes sections in order with `useLang` managing RTL. No external component library — custom components only, using Tailwind v4 classes.

**Tech Stack:** React 19 · Vite · TypeScript · Tailwind v4 · Motion/react · lucide-react · Inter (EN) / Tajawal (AR) fonts

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/data/copy.ts` | **Rewrite** | All EN/AR copy + Lang type |
| `src/hooks/useLang.ts` | Keep | Lang state + RTL effect |
| `src/App.tsx` | **Rewrite** | Compose all 9 sections |
| `src/index.css` | **Update** | Add scroll-smooth, remove old keyframes |
| `src/components/Navbar.tsx` | **Rewrite** | Logo, nav links, lang toggle, CTA |
| `src/components/Hero.tsx` | **Rewrite** | Split screen: text + WhatsApp chat mockup |
| `src/components/StatsStrip.tsx` | **Rewrite** | 4 stats in a row |
| `src/components/Features.tsx` | **Rewrite** | 2×2 feature card grid |
| `src/components/HowItWorks.tsx` | **Rewrite** | 3-step process |
| `src/components/Testimonials.tsx` | **Rewrite** | 3 quote cards |
| `src/components/FreeWeekBanner.tsx` | **Rewrite** | Full-width free trial CTA |
| `src/components/FAQ.tsx` | **Rewrite** | Accordion FAQ |
| `src/components/Footer.tsx` | **Rewrite** | Logo, links, copyright |

**Delete after plan complete:** All other files in `src/components/` not listed above.

---

## Task 0: Clean the slate

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Replace App.tsx with a blank shell**

```tsx
// src/App.tsx
import { useLang } from './hooks/useLang'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div>
      <p style={{ padding: 20 }}>Rebuilding... lang={lang} <button onClick={toggle}>toggle</button></p>
    </div>
  )
}
```

- [ ] **Step 2: Update index.css — remove old keyframes, add scroll-smooth**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap');
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

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

- [ ] **Step 3: Typecheck**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/App.tsx src/index.css
git commit -m "chore: blank slate for rebuild"
```

---

## Task 1: Content — rewrite copy.ts

**Files:**
- Rewrite: `src/data/copy.ts`

- [ ] **Step 1: Replace copy.ts with new simplified interface + full EN/AR content**

```ts
// src/data/copy.ts
export type Lang = 'en' | 'ar'

export interface Copy {
  nav: {
    links: string[]
    cta: string
  }
  hero: {
    badge: string
    headline: string
    highlight: string
    sub: string
    cta1: string
    cta2: string
    chat: { from: 'customer' | 'bot'; text: string }[]
  }
  stats: { value: string; label: string }[]
  features: {
    heading: string
    sub: string
    cards: { icon: string; title: string; desc: string }[]
  }
  howItWorks: {
    heading: string
    steps: { num: string; title: string; desc: string }[]
  }
  testimonials: {
    heading: string
    items: { quote: string; name: string; role: string }[]
  }
  freeWeek: {
    eyebrow: string
    headline: string
    sub: string
    cta: string
  }
  faq: {
    heading: string
    items: { q: string; a: string }[]
  }
  footer: {
    tagline: string
    links: string[]
    copyright: string
  }
}

export const copy: Record<Lang, Copy> = {
  en: {
    nav: {
      links: ['How It Works', 'Features', 'FAQ'],
      cta: 'Start Free Trial',
    },
    hero: {
      badge: '🎉 7-day free trial — no credit card required',
      headline: 'Automate Your WhatsApp',
      highlight: 'While You Sleep.',
      sub: 'Focobot handles orders, replies, and follow-ups on WhatsApp — 24/7, in Arabic and English.',
      cta1: 'Start Free Trial →',
      cta2: 'See How It Works',
      chat: [
        { from: 'customer', text: 'Hi, do you have the black hoodie in XL?' },
        { from: 'bot', text: 'Yes! The black hoodie is available in XL 🎉 Want me to place the order?' },
        { from: 'customer', text: 'Yes please! Cash on delivery.' },
        { from: 'bot', text: 'Order confirmed ✅ You\'ll receive it in 2-3 days. Order #1042.' },
        { from: 'customer', text: 'Amazing, thank you!' },
        { from: 'bot', text: 'Our pleasure! 😊 Track your order anytime by sending "track 1042".' },
      ],
    },
    stats: [
      { value: '500+', label: 'Businesses' },
      { value: '10M+', label: 'Messages Sent' },
      { value: '4.9★', label: 'Average Rating' },
      { value: '24/7', label: 'Always On' },
    ],
    features: {
      heading: 'Everything your business needs',
      sub: 'One bot handles it all — so you can focus on growth.',
      cards: [
        { icon: 'Zap', title: 'AI Auto-Reply', desc: 'Instantly answer customer questions in Arabic and English, around the clock.' },
        { icon: 'ShoppingCart', title: 'Order Management', desc: 'Receive, confirm, and track orders directly inside WhatsApp.' },
        { icon: 'Megaphone', title: 'Broadcast Campaigns', desc: 'Send promotions to your entire contact list with one click.' },
        { icon: 'BarChart2', title: 'Analytics Dashboard', desc: 'Track messages, orders, and revenue from a clean, simple dashboard.' },
      ],
    },
    howItWorks: {
      heading: 'Up and running in minutes',
      steps: [
        { num: '01', title: 'Connect WhatsApp', desc: 'Link your WhatsApp Business number. No technical skills required.' },
        { num: '02', title: 'Set Up Your Bot', desc: 'Pick an industry template and customize your replies, menu, and flows.' },
        { num: '03', title: 'Go Live', desc: 'Your bot starts serving customers instantly. Monitor everything from your dashboard.' },
      ],
    },
    testimonials: {
      heading: 'Trusted by 500+ businesses',
      items: [
        { quote: 'Focobot saved us 3 hours a day on order management. Our customers get instant replies even at 2am.', name: 'Ahmed Al-Rashidi', role: 'Owner, Rashidi Sweets' },
        { quote: 'We went from missing orders to handling 200+ a day. Setup took 15 minutes. Incredible ROI.', name: 'Sara Mansouri', role: 'Manager, Casa Boutique' },
        { quote: "Our customers kept asking 'is this a real person?' — that's how natural the Arabic replies are.", name: 'Khalid Bin Saad', role: 'Founder, Al-Nakheel Dates' },
      ],
    },
    freeWeek: {
      eyebrow: 'Limited time offer',
      headline: 'Try Focobot Free for 7 Days',
      sub: 'No credit card required. Cancel anytime. Full access from day one.',
      cta: 'Claim Your Free Week →',
    },
    faq: {
      heading: 'Got questions?',
      items: [
        { q: 'How long does setup take?', a: 'Most businesses are live in 15–30 minutes. Our onboarding wizard guides you step by step.' },
        { q: 'Does Focobot support Arabic?', a: 'Yes — fully. Focobot replies in natural Arabic (MSA and Gulf dialect) or English, depending on how your customer writes.' },
        { q: 'Do I need WhatsApp Business approval?', a: 'You need a WhatsApp Business number. We guide you through approval — it usually takes 1–3 business days.' },
        { q: 'Can I cancel anytime?', a: 'Yes. Cancel with one click from your dashboard. No questions, no penalties.' },
        { q: 'Is my customer data secure?', a: 'All data is encrypted in transit and at rest. We never sell or share your customer information.' },
        { q: 'How many contacts can I have?', a: 'Plans scale from 500 to unlimited contacts. Start small and grow — no switching pain.' },
      ],
    },
    footer: {
      tagline: 'Your WhatsApp, on autopilot.',
      links: ['How It Works', 'Features', 'FAQ'],
      copyright: '© 2026 Focobot. All rights reserved.',
    },
  },

  ar: {
    nav: {
      links: ['كيف يعمل', 'المميزات', 'الأسئلة'],
      cta: 'جرّب مجاناً',
    },
    hero: {
      badge: '🎉 تجربة مجانية 7 أيام — بدون بطاقة ائتمان',
      headline: 'أتمتة واتساب الخاص بك',
      highlight: 'وأنت نائم.',
      sub: 'فوكوبوت يتولى الطلبات والردود والمتابعات على واتساب — 24/7 بالعربي والإنجليزي.',
      cta1: 'ابدأ التجربة المجانية ←',
      cta2: 'شاهد كيف يعمل',
      chat: [
        { from: 'customer', text: 'السلام، عندكم الهودي الأسود مقاس XL؟' },
        { from: 'bot', text: 'نعم! الهودي الأسود متوفر بمقاس XL 🎉 تبغى أسجل الطلب؟' },
        { from: 'customer', text: 'نعم من فضلك، دفع عند الاستلام.' },
        { from: 'bot', text: 'تم تأكيد طلبك ✅ يصلك خلال 2-3 أيام. رقم الطلب #1042.' },
        { from: 'customer', text: 'ممتاز، شكراً!' },
        { from: 'bot', text: 'العفو! 😊 تتبّع طلبك في أي وقت بإرسال "تتبع 1042".' },
      ],
    },
    stats: [
      { value: '500+', label: 'شركة' },
      { value: '10M+', label: 'رسالة مرسلة' },
      { value: '4.9★', label: 'تقييم' },
      { value: '24/7', label: 'دائماً يعمل' },
    ],
    features: {
      heading: 'كل ما يحتاجه عملك',
      sub: 'بوت واحد يتولى كل شيء — حتى تركّز على النمو.',
      cards: [
        { icon: 'Zap', title: 'رد آلي بالذكاء الاصطناعي', desc: 'أجب على أسئلة العملاء فوراً بالعربي والإنجليزي، على مدار الساعة.' },
        { icon: 'ShoppingCart', title: 'إدارة الطلبات', desc: 'استقبل الطلبات وأكّدها وتتبّعها مباشرة داخل واتساب.' },
        { icon: 'Megaphone', title: 'حملات إذاعية', desc: 'أرسل العروض لقائمة جهات اتصالك الكاملة بنقرة واحدة.' },
        { icon: 'BarChart2', title: 'لوحة التحليلات', desc: 'تتبّع الرسائل والطلبات والإيرادات من لوحة تحكم أنيقة وبسيطة.' },
      ],
    },
    howItWorks: {
      heading: 'جاهز للعمل في دقائق',
      steps: [
        { num: '٠١', title: 'ربط واتساب', desc: 'اربط رقم واتساب للأعمال الخاص بك. لا تحتاج خبرة تقنية.' },
        { num: '٠٢', title: 'إعداد البوت', desc: 'اختر قالباً لمجالك وخصّص الردود والقوائم والتدفقات.' },
        { num: '٠٣', title: 'انطلق', desc: 'يبدأ بوتك في خدمة العملاء فوراً. تابع كل شيء من لوحة التحكم.' },
      ],
    },
    testimonials: {
      heading: 'ثقة أكثر من 500 شركة',
      items: [
        { quote: 'وفّر لنا فوكوبوت 3 ساعات يومياً في إدارة الطلبات. عملاؤنا يحصلون على ردود فورية حتى الساعة 2 صباحاً.', name: 'أحمد الراشدي', role: 'صاحب حلويات الراشدي' },
        { quote: 'انتقلنا من تفويت الطلبات إلى معالجة أكثر من 200 طلب يومياً. الإعداد استغرق 15 دقيقة. عائد استثمار مذهل.', name: 'سارة المنصوري', role: 'مديرة، كازا بوتيك' },
        { quote: 'كان عملاؤنا يسألون: هل هذا شخص حقيقي؟ هكذا جودة الردود العربية الطبيعية.', name: 'خالد بن سعد', role: 'مؤسس، تمور النخيل' },
      ],
    },
    freeWeek: {
      eyebrow: 'عرض لفترة محدودة',
      headline: 'جرّب فوكوبوت مجاناً لمدة 7 أيام',
      sub: 'لا تحتاج بطاقة ائتمان. إلغاء في أي وقت. وصول كامل من اليوم الأول.',
      cta: 'احصل على أسبوعك المجاني ←',
    },
    faq: {
      heading: 'لديك أسئلة؟',
      items: [
        { q: 'كم يستغرق الإعداد؟', a: 'معظم الشركات تبدأ العمل خلال 15-30 دقيقة. معالج التأهيل يرشدك خطوة بخطوة.' },
        { q: 'هل يدعم فوكوبوت اللغة العربية؟', a: 'نعم — بشكل كامل. فوكوبوت يرد بالعربية الطبيعية (الفصحى واللهجة الخليجية) أو الإنجليزية حسب طريقة كتابة عميلك.' },
        { q: 'هل أحتاج موافقة واتساب للأعمال؟', a: 'تحتاج رقم واتساب للأعمال. نرشدك خلال الحصول على الموافقة — عادةً يستغرق 1-3 أيام عمل.' },
        { q: 'هل يمكنني الإلغاء في أي وقت؟', a: 'نعم. إلغاء بنقرة واحدة من لوحة التحكم. بدون أسئلة وبدون عقوبات.' },
        { q: 'هل بيانات عملائي آمنة؟', a: 'جميع البيانات مشفرة أثناء النقل وفي حالة السكون. لا نبيع أو نشارك معلومات عملائك أبداً.' },
        { q: 'كم عدد جهات الاتصال التي يمكنني امتلاكها؟', a: 'الخطط تتدرج من 500 إلى جهات اتصال غير محدودة. ابدأ صغيراً ونمُ — بدون ألم التبديل.' },
      ],
    },
    footer: {
      tagline: 'واتساب خاصتك، على الطيار الآلي.',
      links: ['كيف يعمل', 'المميزات', 'الأسئلة الشائعة'],
      copyright: '© 2026 فوكوبوت. جميع الحقوق محفوظة.',
    },
  },
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/data/copy.ts
git commit -m "feat: rewrite copy.ts with full EN/AR content for rebuild"
```

---

## Task 2: Navbar

**Files:**
- Rewrite: `src/components/Navbar.tsx`

- [ ] **Step 1: Write Navbar**

```tsx
// src/components/Navbar.tsx
import { useState, useEffect } from 'react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface NavbarProps {
  lang: Lang
  onToggleLang: () => void
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = copy[lang].nav
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-black tracking-tight text-[#111]">
          FOCO<span className="text-orange">BOT</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {t.links.map((link, i) => (
            <a
              key={i}
              href={['#how-it-works', '#features', '#faq'][i]}
              className="text-sm font-medium text-gray-500 hover:text-[#111] transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="text-xs font-semibold text-gray-400 hover:text-[#111] transition-colors px-2 py-1 rounded border border-gray-200 hover:border-gray-400"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <a
            href="#free-week"
            className="hidden md:inline-flex items-center bg-orange text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-orange/90 transition-colors"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
```

- [ ] **Step 3: Wire into App.tsx temporarily to verify in browser**

```tsx
// src/App.tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen">
      <Navbar lang={lang} onToggleLang={toggle} />
      <div className="pt-20 p-8 text-gray-400 text-sm">Building…</div>
    </div>
  )
}
```

- [ ] **Step 4: Run dev server and verify Navbar looks correct in EN and AR**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npm run dev
```

Open `http://localhost:3000`. Check: logo shows, links show, lang toggle switches text, scrolled state adds border.

- [ ] **Step 5: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/Navbar.tsx src/App.tsx
git commit -m "feat: Navbar — sticky, lang toggle, scroll border"
```

---

## Task 3: Hero — Split Screen

**Files:**
- Rewrite: `src/components/Hero.tsx`

- [ ] **Step 1: Write Hero**

```tsx
// src/components/Hero.tsx
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface HeroProps { lang: Lang }

function ChatBubble({ from, text, delay }: { from: 'customer' | 'bot'; text: string; delay: number }) {
  const isBot = from === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex items-end gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
          isBot ? 'bg-orange text-white' : 'bg-gray-200 text-gray-600'
        }`}
      >
        {isBot ? 'F' : 'C'}
      </div>
      <div
        className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
          isBot
            ? 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
            : 'bg-[#dcf8c6] text-gray-800 rounded-br-sm'
        }`}
      >
        {text}
      </div>
    </motion.div>
  )
}

export default function Hero({ lang }: HeroProps) {
  const t = copy[lang].hero

  return (
    <section className="min-h-screen pt-16 flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className={`flex flex-col ${lang === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>

          {/* Text side */}
          <div className="flex-1 text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-orange-light text-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-orange/20">
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111] leading-tight mb-2"
            >
              {t.headline}
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-orange leading-tight mb-6"
            >
              {t.highlight}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-500 mb-10 max-w-md"
            >
              {t.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <a
                href="#free-week"
                className="inline-flex items-center bg-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange/90 transition-colors text-sm shadow-lg shadow-orange/25"
              >
                {t.cta1}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center text-gray-600 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-400 hover:text-[#111] transition-colors text-sm"
              >
                {t.cta2}
              </a>
            </motion.div>
          </div>

          {/* Chat mockup side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 w-full max-w-sm"
          >
            <div className="bg-[#ece5dd] rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* WhatsApp header */}
              <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">F</div>
                <div>
                  <div className="text-white font-semibold text-sm">Focobot</div>
                  <div className="text-green-200 text-xs">online</div>
                </div>
              </div>
              {/* Messages */}
              <div className="p-4 flex flex-col gap-3 min-h-[320px]">
                {t.chat.map((msg, i) => (
                  <ChatBubble key={i} from={msg.from} text={msg.text} delay={0.5 + i * 0.2} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to App.tsx**

```tsx
// src/App.tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen">
      <Navbar lang={lang} onToggleLang={toggle} />
      <Hero lang={lang} />
    </div>
  )
}
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
```

- [ ] **Step 4: Visual check in browser**

Verify: headline shows, chat bubbles animate in, toggle to AR flips layout (text right, chat left), chat messages show in Arabic.

- [ ] **Step 5: Commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: Hero — split screen with animated WhatsApp chat mockup"
```

---

## Task 4: Stats Strip

**Files:**
- Rewrite: `src/components/StatsStrip.tsx`

- [ ] **Step 1: Write StatsStrip**

```tsx
// src/components/StatsStrip.tsx
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface StatsStripProps { lang: Lang }

export default function StatsStrip({ lang }: StatsStripProps) {
  const stats = copy[lang].stats

  return (
    <section className="border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-orange mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
// src/App.tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen">
      <Navbar lang={lang} onToggleLang={toggle} />
      <Hero lang={lang} />
      <StatsStrip lang={lang} />
    </div>
  )
}
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
git add src/components/StatsStrip.tsx src/App.tsx
git commit -m "feat: StatsStrip — 4 animated stat numbers"
```

---

## Task 5: Features

**Files:**
- Rewrite: `src/components/Features.tsx`

- [ ] **Step 1: Write Features**

```tsx
// src/components/Features.tsx
import { motion } from 'motion/react'
import { Zap, ShoppingCart, Megaphone, BarChart2 } from 'lucide-react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, ShoppingCart, Megaphone, BarChart2,
}

interface FeaturesProps { lang: Lang }

export default function Features({ lang }: FeaturesProps) {
  const t = copy[lang].features

  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#111] mb-3">{t.heading}</h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">{t.sub}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {t.cards.map((card, i) => {
            const Icon = ICONS[card.icon]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-7 rounded-2xl border border-gray-100 hover:border-orange/30 hover:shadow-lg hover:shadow-orange/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-orange-light rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange/10 transition-colors">
                  {Icon && <Icon className="w-5 h-5 text-orange" />}
                </div>
                <h3 className="text-lg font-bold text-[#111] mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
// src/App.tsx — add Features import and usage after StatsStrip
import Features from './components/Features'
// ... inside return, after <StatsStrip lang={lang} />:
<Features lang={lang} />
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
git add src/components/Features.tsx src/App.tsx
git commit -m "feat: Features — 2x2 card grid with icons"
```

---

## Task 6: How It Works

**Files:**
- Rewrite: `src/components/HowItWorks.tsx`

- [ ] **Step 1: Write HowItWorks**

```tsx
// src/components/HowItWorks.tsx
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface HowItWorksProps { lang: Lang }

export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = copy[lang].howItWorks

  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#111]">{t.heading}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Dashed connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[16.7%] right-[16.7%] h-px border-t-2 border-dashed border-orange/20 pointer-events-none" />

          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white border-2 border-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-lg font-black text-orange">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-[#111] mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
import HowItWorks from './components/HowItWorks'
// after <Features lang={lang} />:
<HowItWorks lang={lang} />
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
git add src/components/HowItWorks.tsx src/App.tsx
git commit -m "feat: HowItWorks — 3 steps with dashed connector"
```

---

## Task 7: Testimonials

**Files:**
- Rewrite: `src/components/Testimonials.tsx`

- [ ] **Step 1: Write Testimonials**

```tsx
// src/components/Testimonials.tsx
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface TestimonialsProps { lang: Lang }

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = copy[lang].testimonials

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#111]">{t.heading}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-7 rounded-2xl border border-gray-100 flex flex-col gap-5"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-orange text-sm">★</span>
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                "{item.quote}"
              </blockquote>
              <div>
                <div className="font-bold text-[#111] text-sm">{item.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
import Testimonials from './components/Testimonials'
// after <HowItWorks lang={lang} />:
<Testimonials lang={lang} />
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
git add src/components/Testimonials.tsx src/App.tsx
git commit -m "feat: Testimonials — 3 quote cards with star ratings"
```

---

## Task 8: Free Week Banner

**Files:**
- Rewrite: `src/components/FreeWeekBanner.tsx`

- [ ] **Step 1: Write FreeWeekBanner**

```tsx
// src/components/FreeWeekBanner.tsx
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface FreeWeekBannerProps { lang: Lang }

export default function FreeWeekBanner({ lang }: FreeWeekBannerProps) {
  const t = copy[lang].freeWeek

  return (
    <section id="free-week" className="py-24 px-6 bg-orange-light">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold text-orange uppercase tracking-widest mb-4">
            {t.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111] leading-tight mb-4">
            {t.headline}
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
            {t.sub}
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-orange text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-orange/90 transition-colors shadow-xl shadow-orange/25"
          >
            {t.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
import FreeWeekBanner from './components/FreeWeekBanner'
// after <Testimonials lang={lang} />:
<FreeWeekBanner lang={lang} />
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
git add src/components/FreeWeekBanner.tsx src/App.tsx
git commit -m "feat: FreeWeekBanner — orange full-width free trial CTA"
```

---

## Task 9: FAQ

**Files:**
- Rewrite: `src/components/FAQ.tsx`

- [ ] **Step 1: Write FAQ with custom accordion**

```tsx
// src/components/FAQ.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface FAQProps { lang: Lang }

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-start gap-4 group"
      >
        <span className="font-semibold text-[#111] text-sm md:text-base group-hover:text-orange transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-orange' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ({ lang }: FAQProps) {
  const t = copy[lang].faq
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#111]">{t.heading}</h2>
        </motion.div>

        <div className="rounded-2xl border border-gray-100 px-6 md:px-8">
          {t.items.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              open={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
import FAQ from './components/FAQ'
// after <FreeWeekBanner lang={lang} />:
<FAQ lang={lang} />
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
git add src/components/FAQ.tsx src/App.tsx
git commit -m "feat: FAQ — animated accordion with motion/react"
```

---

## Task 10: Footer

**Files:**
- Rewrite: `src/components/Footer.tsx`

- [ ] **Step 1: Write Footer**

```tsx
// src/components/Footer.tsx
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface FooterProps { lang: Lang; onToggleLang: () => void }

export default function Footer({ lang, onToggleLang }: FooterProps) {
  const t = copy[lang].footer

  return (
    <footer className="border-t border-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-black text-[#111] mb-1">
              FOCO<span className="text-orange">BOT</span>
            </div>
            <p className="text-xs text-gray-400">{t.tagline}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {t.links.map((link, i) => (
              <a
                key={i}
                href={['#how-it-works', '#features', '#faq'][i]}
                className="text-sm text-gray-400 hover:text-[#111] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLang}
              className="text-xs text-gray-400 hover:text-[#111] transition-colors"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <span className="text-xs text-gray-300">{t.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
import Footer from './components/Footer'
// after <FAQ lang={lang} />:
<Footer lang={lang} onToggleLang={toggle} />
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
git add src/components/Footer.tsx src/App.tsx
git commit -m "feat: Footer — logo, links, lang toggle, copyright"
```

---

## Task 11: Final App.tsx + cleanup

**Files:**
- Finalize: `src/App.tsx`
- Delete: all old component files not in the new file map

- [ ] **Step 1: Write final App.tsx**

```tsx
// src/App.tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FreeWeekBanner from './components/FreeWeekBanner'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  const { lang, toggle } = useLang()

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} onToggleLang={toggle} />
      <main className="pt-16">
        <Hero lang={lang} />
        <StatsStrip lang={lang} />
        <Features lang={lang} />
        <HowItWorks lang={lang} />
        <Testimonials lang={lang} />
        <FreeWeekBanner lang={lang} />
        <FAQ lang={lang} />
      </main>
      <Footer lang={lang} onToggleLang={toggle} />
    </div>
  )
}
```

- [ ] **Step 2: Delete old components no longer used**

```bash
cd /Users/jarjar/Desktop/focobotweb1/src/components
rm -f Aurora.tsx Aurora.css ChatFlow.tsx ClickSpark.tsx Comparison.tsx \
  DashboardPreview.tsx FreeTrial.tsx Galaxy.tsx Galaxy.css \
  Hyperspeed.tsx LiveDemo.tsx ROICalculator.tsx ScrollReveal.tsx \
  ShaderCanvas.tsx ShinyText.tsx SocialProof.tsx SocialProofToast.tsx \
  SpotlightCard.tsx StatStrip.tsx WhatsAppFAB.tsx
```

- [ ] **Step 3: Final typecheck**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Full visual QA — run dev server**

```bash
cd /Users/jarjar/Desktop/focobotweb1 && npm run dev
```

Check each section at `http://localhost:3000`:
- [ ] Navbar sticks on scroll, lang toggle works
- [ ] Hero: both columns show, chat animates, AR flips layout
- [ ] Stats: 4 numbers animate in on scroll
- [ ] Features: 4 cards, icons render, hover effect
- [ ] How It Works: 3 steps with numbers, dashed line visible on desktop
- [ ] Testimonials: 3 cards with stars
- [ ] Free Week Banner: orange bg, CTA button
- [ ] FAQ: accordion opens/closes, first item open by default
- [ ] Footer: links, lang toggle, copyright
- [ ] Toggle to AR: all text switches, RTL layout applies, Tajawal font loads

- [ ] **Step 5: Final commit**

```bash
cd /Users/jarjar/Desktop/focobotweb1
git add -A
git commit -m "feat: complete Focobot landing page rebuild — clean light theme, 9 sections, EN/AR"
```
