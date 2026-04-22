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
        { from: 'bot', text: "Order confirmed ✅ You'll receive it in 2-3 days. Order #1042." },
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
