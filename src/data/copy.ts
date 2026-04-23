export type Lang = 'en' | 'ar'

export interface Copy {
  nav: {
    links: { label: string; href: string }[]
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
  roi: {
    heading: string
    sub: string
    ordersLabel: string
    avgLabel: string
    resultHeading: string
    lossPrefix: string
    lossSuffix: string
    lossNote: string
    cta: string
  }
  motto: {
    line1: string
    line2: string
    sub: string
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
    links: { label: string; href: string }[]
    copyright: string
  }
}

export const copy: Record<Lang, Copy> = {
  en: {
    nav: {
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
        { label: 'FAQ', href: '#faq' },
      ],
      cta: 'Start Free Trial',
    },
    hero: {
      badge: '7-day free trial — no credit card required',
      headline: 'Your WhatsApp,',
      highlight: 'On Autopilot.',
      sub: 'Focobot replies to customers, takes orders, and follows up — 24/7 in Arabic and English. While you sleep.',
      cta1: 'Start Free →',
      cta2: 'See How It Works',
      chat: [
        { from: 'customer', text: 'Hi, do you have the black hoodie in XL?' },
        { from: 'bot', text: 'Yes! The black hoodie is available in XL 🎉 Want me to place the order?' },
        { from: 'customer', text: 'Yes please! Cash on delivery.' },
        { from: 'bot', text: 'Order confirmed ✅ Arrives in 2-3 days. Order #1042.' },
        { from: 'customer', text: 'Amazing, thank you!' },
        { from: 'bot', text: 'Our pleasure! 😊 Track your order anytime — just send "track 1042".' },
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
        { icon: 'Zap', title: 'AI Auto-Reply', desc: 'Instant answers in Arabic and English, around the clock. No human needed.' },
        { icon: 'ShoppingCart', title: 'Order Management', desc: 'Receive, confirm, and track orders directly inside WhatsApp.' },
        { icon: 'Megaphone', title: 'Broadcast Campaigns', desc: 'Send promotions to your full contact list with one click.' },
        { icon: 'BarChart2', title: 'Analytics Dashboard', desc: 'Track messages, orders, and revenue from a clean, simple dashboard.' },
        { icon: 'Globe', title: 'Arabic + English', desc: 'Detects the customer\'s language and replies naturally in both.' },
        { icon: 'Bell', title: 'Instant Alerts', desc: 'Get notified immediately when a customer needs a human touch.' },
      ],
    },
    howItWorks: {
      heading: 'Up and running in minutes',
      steps: [
        { num: '01', title: 'Connect WhatsApp', desc: 'Link your WhatsApp Business number. No technical skills needed — takes 2 minutes.' },
        { num: '02', title: 'Train Your Bot', desc: 'Add your menu, products, and FAQs. Pick a template for your industry.' },
        { num: '03', title: 'Go Live', desc: 'Your bot starts serving customers instantly. Monitor everything from your dashboard.' },
      ],
    },
    testimonials: {
      heading: 'Trusted by businesses across the Gulf',
      items: [
        { quote: 'Focobot saved us 3 hours a day on order management. Our customers get instant replies even at 2am. It paid for itself in the first week.', name: 'Ahmed Al-Rashidi', role: 'Owner, Al-Nasma Sweets — Kuwait' },
        { quote: 'We went from missing orders to handling 200+ a day. Setup took 15 minutes. The ROI is unreal.', name: 'Sara Al-Mansouri', role: 'Manager, Casa Boutique — Dubai' },
        { quote: "Our customers kept asking 'is this a real person?' — that's how natural the Arabic replies are.", name: 'Khalid Bin Saad', role: 'Founder, Al-Nakheel Dates — Riyadh' },
      ],
    },
    roi: {
      heading: 'How much are you losing right now?',
      sub: '30% of customers who don\'t get a reply within 5 minutes go to a competitor. Every minute you\'re offline is money walking out the door.',
      ordersLabel: 'Orders per day',
      avgLabel: 'Average order value (KWD)',
      resultHeading: 'Monthly revenue you\'re leaving on the table',
      lossPrefix: '−',
      lossSuffix: ' KWD / month',
      lossNote: 'Based on 30% of orders lost to slow replies',
      cta: 'Stop the loss — start free →',
    },
    motto: {
      line1: 'We charge a tenth',
      line2: 'of the value we offer.',
      sub: 'A full-time employee costs 300 KWD/month and goes home at 5pm. Focobot costs less than a dinner out — and works every hour of every day.',
    },
    freeWeek: {
      eyebrow: 'Limited time offer',
      headline: 'Try Focobot Free for 7 Days',
      sub: 'No credit card. No commitment. Full access from day one.',
      cta: 'Claim Your Free Week →',
    },
    faq: {
      heading: 'Got questions?',
      items: [
        { q: 'How long does setup take?', a: 'Most businesses are live in 15–30 minutes. Our onboarding wizard walks you through every step.' },
        { q: 'Does Focobot support Arabic?', a: 'Yes — fully. Focobot replies in natural Arabic (MSA and Gulf dialect) or English, depending on how your customer writes.' },
        { q: 'Do I need WhatsApp Business approval?', a: 'You need a WhatsApp Business number. We guide you through the approval process — it usually takes 1–3 business days.' },
        { q: 'Can I cancel anytime?', a: 'Yes. One click from your dashboard. No questions, no penalties, no hard feelings.' },
        { q: 'Is my customer data secure?', a: 'All data is encrypted in transit and at rest. We never sell or share your customer information.' },
        { q: 'How many contacts can I have?', a: 'Plans scale from 500 to unlimited contacts. Start small, grow without pain.' },
      ],
    },
    footer: {
      tagline: 'Your WhatsApp, on autopilot.',
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
        { label: 'FAQ', href: '#faq' },
      ],
      copyright: '© 2026 Focobot. All rights reserved.',
    },
  },

  ar: {
    nav: {
      links: [
        { label: 'كيف يعمل', href: '#how-it-works' },
        { label: 'المميزات', href: '#features' },
        { label: 'الأسئلة', href: '#faq' },
      ],
      cta: 'جرّب مجاناً',
    },
    hero: {
      badge: 'تجربة مجانية 7 أيام — بدون بطاقة ائتمان',
      headline: 'موظفك الذكي…',
      highlight: 'ما ينام ولا يتأخر.',
      sub: 'فوكوبوت يرد على عملاءك، يستقبل الطلبات، ويتابع — 24/7 بالعربي والإنجليزي. وأنت ترتاح.',
      cta1: 'جرّب مجاناً ←',
      cta2: 'شاهد كيف يعمل',
      chat: [
        { from: 'customer', text: 'السلام، عندكم الهودي الأسود مقاس XL؟' },
        { from: 'bot', text: 'نعم! الهودي الأسود متوفر بمقاس XL 🎉 تبغى أسجل الطلب؟' },
        { from: 'customer', text: 'نعم من فضلك، دفع عند الاستلام.' },
        { from: 'bot', text: 'تم تأكيد طلبك ✅ يصلك خلال 2-3 أيام. رقم الطلب #1042.' },
        { from: 'customer', text: 'ممتاز، شكراً!' },
        { from: 'bot', text: 'العفو! 😊 تتبّع طلبك في أي وقت — أرسل "تتبع 1042".' },
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
        { icon: 'Zap', title: 'رد آلي فوري', desc: 'ردود فورية بالعربي والإنجليزي، على مدار الساعة. بدون موظف.' },
        { icon: 'ShoppingCart', title: 'إدارة الطلبات', desc: 'استقبل الطلبات وأكّدها وتتبّعها مباشرة داخل واتساب.' },
        { icon: 'Megaphone', title: 'حملات إذاعية', desc: 'أرسل العروض لقائمة جهات اتصالك الكاملة بنقرة واحدة.' },
        { icon: 'BarChart2', title: 'لوحة التحليلات', desc: 'تابع الرسائل والطلبات والإيرادات من لوحة تحكم بسيطة.' },
        { icon: 'Globe', title: 'عربي + إنجليزي', desc: 'يكتشف لغة العميل ويرد بشكل طبيعي في اللغتين.' },
        { icon: 'Bell', title: 'تنبيهات فورية', desc: 'تنبيه فوري عندما يحتاج العميل تدخلاً بشرياً.' },
      ],
    },
    howItWorks: {
      heading: 'يشتغل خلال دقائق',
      steps: [
        { num: '٠١', title: 'ربط واتساب', desc: 'اربط رقم واتساب للأعمال الخاص بك. لا تحتاج خبرة تقنية — دقيقتان فقط.' },
        { num: '٠٢', title: 'علّم البوت', desc: 'أضف منيوك ومنتجاتك وأسئلتك الشائعة. اختر قالباً لمجالك.' },
        { num: '٠٣', title: 'انطلق', desc: 'يبدأ بوتك في خدمة العملاء فوراً. تابع كل شيء من لوحة التحكم.' },
      ],
    },
    testimonials: {
      heading: 'ثقة أصحاب المشاريع في الخليج',
      items: [
        { quote: 'من يوم شغلناه، وفّر لنا فوكوبوت 3 ساعات يومياً. عملاؤنا يحصلون على ردود فورية حتى الساعة 2 صباحاً. استرد تكلفته في أول أسبوع.', name: 'أحمد الراشدي', role: 'صاحب النسمة سويت — الكويت' },
        { quote: 'انتقلنا من تفويت الطلبات إلى معالجة أكثر من 200 طلب يومياً. الإعداد استغرق 15 دقيقة. عائد الاستثمار لا يُصدق.', name: 'سارة المنصوري', role: 'مديرة، كازا بوتيك — دبي' },
        { quote: 'كان عملاؤنا يسألون: هل هذا شخص حقيقي؟ هكذا جودة الردود العربية الطبيعية.', name: 'خالد بن سعد', role: 'مؤسس، تمور النخيل — الرياض' },
      ],
    },
    roi: {
      heading: 'تدري جم قاعد تخسر الحين؟',
      sub: 'أغلب العملاء ما ينطرون أكثر من 5 دقايق — أي تأخير يعني فلوس عند المنافس. كل دقيقة أنت أوفلاين = طلب ضايع.',
      ordersLabel: 'طلبات باليوم',
      avgLabel: 'متوسط الطلب (د.ك)',
      resultHeading: 'الإيراد الشهري اللي قاعد يطير',
      lossPrefix: '−',
      lossSuffix: ' د.ك / شهر',
      lossNote: 'بناءً على 30% من الطلبات الضايعة بسبب بطء الرد',
      cta: 'وقف الخسارة — ابدأ مجاناً ←',
    },
    motto: {
      line1: 'نأخذ عُشر',
      line2: 'القيمة التي نقدّمها.',
      sub: 'موظف بدوام كامل يكلّفك 300 دينار شهرياً وينتهي وقته الساعة 5 عصراً. فوكوبوت أقل من عشاء عائلة — ويشتغل كل ساعة في اليوم.',
    },
    freeWeek: {
      eyebrow: 'عرض لفترة محدودة',
      headline: 'جرّب فوكوبوت مجاناً 7 أيام',
      sub: 'بدون بطاقة. بدون التزام. وصول كامل من اليوم الأول.',
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
      links: [
        { label: 'كيف يعمل', href: '#how-it-works' },
        { label: 'المميزات', href: '#features' },
        { label: 'الأسئلة الشائعة', href: '#faq' },
      ],
      copyright: '© 2026 فوكوبوت. جميع الحقوق محفوظة.',
    },
  },
}
