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
  useCases: {
    heading: string
    sub: string
    items: { icon: string; title: string; desc: string }[]
  }
  howItWorks: {
    heading: string
    steps: { num: string; title: string; desc: string }[]
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
  demo: {
    heading: string
    sub: string
    nameLabel: string
    namePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    emailOptional: string
    businessLabel: string
    ctaStart: string
    inputPlaceholder: string
    remainingPrefix: string
    remainingSuffix: string
    capHeading: string
    capSub: string
    ctaUpgrade: string
    typing: string
    businessTypes: { id: string; label: string; icon: string }[]
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

// Mixed EN+AR floating reviews shown together on the social proof wall
export const floatingReviews = [
  { text: "Saves us 3 hours a day on order management. Customers get replies at 2am.", name: "Ahmed Al-Rashidi", company: "Al-Nasma Sweets", stars: 5, lang: 'en' },
  { text: "وفّر لنا 3 ساعات يومياً. عملاؤنا يحصلون على ردود فورية حتى الساعة 2 صباحاً.", name: "أحمد الراشدي", company: "حلويات النسمة", stars: 5, lang: 'ar' },
  { text: "Our customers kept asking 'is this a real person?' The Arabic is that natural.", name: "Khalid Bin Saad", company: "Al-Nakheel Dates", stars: 5, lang: 'en' },
  { text: "عملاؤنا كانوا يسألون: هل هذا موظف حقيقي؟ العربية طبيعية جداً.", name: "خالد بن سعد", company: "تمور النخيل", stars: 5, lang: 'ar' },
  { text: "Setup took 15 minutes. Now handling 200+ orders/day. Unreal ROI.", name: "Sara Al-Mansouri", company: "Casa Boutique", stars: 5, lang: 'en' },
  { text: "الإعداد أخذ 15 دقيقة. الآن نعالج أكثر من 200 طلب يومياً.", name: "سارة المنصوري", company: "كازا بوتيك", stars: 5, lang: 'ar' },
  { text: "Never miss a reservation inquiry now, even on weekends.", name: "Faisal Al-Otaibi", company: "Atlas Restaurant", stars: 5, lang: 'en' },
  { text: "ما نفوّت أي حجز الحين، حتى في عطلة نهاية الأسبوع.", name: "فيصل العتيبي", company: "مطعم أطلس", stars: 5, lang: 'ar' },
  { text: "Membership sign-ups doubled after we added the bot. It qualifies leads automatically.", name: "Nora Hassan", company: "FitLife Gym", stars: 5, lang: 'en' },
  { text: "اشتراكات الجيم تضاعفت بعد البوت. يؤهّل العملاء تلقائياً.", name: "نورة حسن", company: "فيتلايف جيم", stars: 5, lang: 'ar' },
  { text: "Appointment reminders through WhatsApp cut no-shows by 60%.", name: "Dr. Layla Al-Kuwaiti", company: "Bloom Dental", stars: 5, lang: 'en' },
  { text: "تذكيرات المواعيد على واتساب قلّلت الغيابات 60%.", name: "د. ليلى الكويتي", company: "عيادة بلوم", stars: 5, lang: 'ar' },
  { text: "Broadcast campaigns tripled our Ramadan sales. One click, 2000 customers.", name: "Tariq Mahmoud", company: "Layers Bakery", stars: 5, lang: 'en' },
  { text: "حملات الإذاعة ثلّثت مبيعاتنا في رمضان. نقرة واحدة لـ 2000 عميل.", name: "طارق محمود", company: "مخبز لايرز", stars: 5, lang: 'ar' },
  { text: "Best investment we made this year. Paid for itself in week one.", name: "Mariam Al-Shammari", company: "Style Salon", stars: 5, lang: 'en' },
  { text: "أفضل استثمار هذه السنة. استرد تكلفته في الأسبوع الأول.", name: "مريم الشمري", company: "صالون ستايل", stars: 5, lang: 'ar' },
  { text: "Replies faster than any employee we've ever hired. 24/7 without complaints.", name: "Jassim Al-Qattan", company: "Desert Gym", stars: 5, lang: 'en' },
  { text: "يرد أسرع من أي موظف استأجرناه. 24/7 بدون شكاوى.", name: "جاسم القطان", company: "صالة ديزرت", stars: 5, lang: 'ar' },
  { text: "Contact list grew 40% in the first month just from bot conversations.", name: "Hessa Al-Muhairi", company: "Gulf Boutique", stars: 5, lang: 'en' },
  { text: "قائمة جهات الاتصال زادت 40% في الشهر الأول من محادثات البوت.", name: "حصة المهيري", company: "بوتيك الخليج", stars: 5, lang: 'ar' },
  { text: "Patients book appointments at midnight now. Completely changed how we operate.", name: "Dr. Yousif Al-Bader", company: "Al-Noor Clinic", stars: 5, lang: 'en' },
  { text: "المرضى يحجزون مواعيد في منتصف الليل. غيّر طريقة عملنا كلياً.", name: "د. يوسف البدر", company: "عيادة النور", stars: 5, lang: 'ar' },
  { text: "The Arabic dialect support is incredible. Customers from Kuwait, UAE, Saudi — all handled.", name: "Reem Al-Sabah", company: "Mango Café", stars: 5, lang: 'en' },
  { text: "دعم اللهجات العربية رائع. عملاء من الكويت والإمارات والسعودية — كلهم ممتازون.", name: "ريم الصباح", company: "كافيه مانجو", stars: 5, lang: 'ar' },
] as const

export const copy: Record<Lang, Copy> = {
  en: {
    nav: {
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
        { label: 'Try It', href: '#demo' },
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
        { icon: 'Zap', title: 'AI Auto-Reply', desc: 'Instant answers in Arabic and English, around the clock.' },
        { icon: 'ShoppingCart', title: 'Order Management', desc: 'Receive, confirm, and track orders directly inside WhatsApp.' },
        { icon: 'Megaphone', title: 'Broadcast Campaigns', desc: 'Send promotions to your full contact list with one click.' },
        { icon: 'BarChart2', title: 'Analytics Dashboard', desc: 'Track messages, orders, and revenue from a clean dashboard.' },
        { icon: 'Globe', title: 'Arabic + English', desc: 'Detects the customer\'s language and replies naturally in both.' },
        { icon: 'Bell', title: 'Instant Alerts', desc: 'Get notified the moment a customer needs a human touch.' },
      ],
    },
    useCases: {
      heading: 'Built for every business',
      sub: 'Restaurants, clinics, gyms, salons, boutiques — if you talk to customers on WhatsApp, Focobot works for you.',
      items: [
        { icon: '🍽️', title: 'Restaurants', desc: 'Take reservations, share menus, handle delivery orders 24/7.' },
        { icon: '☕', title: 'Cafés', desc: 'Answer menu questions, take pre-orders, send daily specials.' },
        { icon: '💪', title: 'Gyms', desc: 'Sell memberships, book classes, send workout reminders.' },
        { icon: '🏥', title: 'Clinics', desc: 'Book appointments, send reminders, answer FAQ about services.' },
        { icon: '👗', title: 'Boutiques', desc: 'Share product availability, take orders, broadcast new arrivals.' },
        { icon: '✂️', title: 'Salons', desc: 'Book appointments, confirm slots, send reminders to reduce no-shows.' },
        { icon: '🍰', title: 'Bakeries', desc: 'Handle custom orders, delivery, and daily availability updates.' },
        { icon: '🏬', title: 'Any Store', desc: 'If you have a WhatsApp number, Focobot handles your conversations.' },
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
    roi: {
      heading: 'How much are you losing right now?',
      sub: '30% of customers leave if they don\'t get a reply within 5 minutes. Every minute offline is revenue walking out the door.',
      ordersLabel: 'Orders per day',
      avgLabel: 'Average order value (KWD)',
      resultHeading: 'Monthly revenue you\'re leaving on the table',
      lossPrefix: '−',
      lossSuffix: ' KWD / month',
      lossNote: 'Based on 30% of orders lost to slow replies',
      cta: 'Stop the loss — start free →',
    },
    demo: {
      heading: 'Try the real bot — live',
      sub: 'Chat with Focobot right now. It\'s the same AI powering real businesses across the Gulf.',
      nameLabel: 'Your name',
      namePlaceholder: 'e.g. Ahmed',
      phoneLabel: 'WhatsApp number',
      phonePlaceholder: '+965 XXXX XXXX',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      emailOptional: 'Optional',
      businessLabel: 'What\'s your business type?',
      ctaStart: 'Start chatting →',
      inputPlaceholder: 'Type a message…',
      remainingPrefix: '',
      remainingSuffix: ' messages left',
      capHeading: 'You\'ve used your 10 free messages!',
      capSub: 'Start your free 7-day trial to get your own bot — no credit card required.',
      ctaUpgrade: 'Start Free Trial →',
      typing: 'Focobot is typing…',
      businessTypes: [
        { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
        { id: 'cafe', label: 'Café', icon: '☕' },
        { id: 'gym', label: 'Gym', icon: '💪' },
        { id: 'clinic', label: 'Clinic', icon: '🏥' },
        { id: 'boutique', label: 'Boutique', icon: '👗' },
        { id: 'bakery', label: 'Bakery', icon: '🍰' },
      ],
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
        { q: 'Does Focobot support Arabic?', a: 'Yes — fully. Focobot replies in natural Arabic (MSA and Gulf dialect) or English depending on how your customer writes.' },
        { q: 'Do I need WhatsApp Business approval?', a: 'You need a WhatsApp Business number. We guide you through approval — usually takes 1–3 business days.' },
        { q: 'Can I cancel anytime?', a: 'Yes. One click from your dashboard. No questions, no penalties.' },
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
        { label: 'جرّبه', href: '#demo' },
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
        { icon: 'Zap', title: 'رد آلي فوري', desc: 'ردود فورية بالعربي والإنجليزي، على مدار الساعة.' },
        { icon: 'ShoppingCart', title: 'إدارة الطلبات', desc: 'استقبل الطلبات وأكّدها وتتبّعها مباشرة داخل واتساب.' },
        { icon: 'Megaphone', title: 'حملات إذاعية', desc: 'أرسل العروض لقائمة جهات اتصالك الكاملة بنقرة واحدة.' },
        { icon: 'BarChart2', title: 'لوحة التحليلات', desc: 'تابع الرسائل والطلبات والإيرادات من لوحة تحكم بسيطة.' },
        { icon: 'Globe', title: 'عربي + إنجليزي', desc: 'يكتشف لغة العميل ويرد بشكل طبيعي في اللغتين.' },
        { icon: 'Bell', title: 'تنبيهات فورية', desc: 'تنبيه فوري عندما يحتاج العميل تدخلاً بشرياً.' },
      ],
    },
    useCases: {
      heading: 'لكل نوع من الأعمال',
      sub: 'مطاعم، عيادات، جيمات، صالونات، بوتيكات — إذا تتحدث مع عملائك على واتساب، فوكوبوت يعمل معك.',
      items: [
        { icon: '🍽️', title: 'المطاعم', desc: 'استقبل الحجوزات، أرسل المنيو، تولّى طلبات التوصيل 24/7.' },
        { icon: '☕', title: 'الكافيهات', desc: 'أجب عن الأسئلة، استقبل الطلبات المسبقة، أرسل العروض اليومية.' },
        { icon: '💪', title: 'الجيمات', desc: 'بِع الاشتراكات، احجز الحصص، أرسل تذكيرات التمرين.' },
        { icon: '🏥', title: 'العيادات', desc: 'احجز المواعيد، أرسل التذكيرات، أجب عن الأسئلة الشائعة.' },
        { icon: '👗', title: 'البوتيكات', desc: 'شارك توفر المنتجات، استقبل الطلبات، أعلن عن الوصولات الجديدة.' },
        { icon: '✂️', title: 'الصالونات', desc: 'احجز المواعيد، أكّد الحجوزات، أرسل تذكيرات لتقليل الغيابات.' },
        { icon: '🍰', title: 'المخابز', desc: 'تولّى الطلبات المخصصة والتوصيل وتحديثات التوفر اليومية.' },
        { icon: '🏬', title: 'أي متجر', desc: 'إذا عندك رقم واتساب، فوكوبوت يتولى محادثاتك.' },
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
    roi: {
      heading: 'تدري جم قاعد تخسر الحين؟',
      sub: 'أغلب العملاء ما ينطرون أكثر من 5 دقائق — أي تأخير يعني فلوس عند المنافس. كل دقيقة أنت أوفلاين = طلب ضايع.',
      ordersLabel: 'طلبات باليوم',
      avgLabel: 'متوسط الطلب (د.ك)',
      resultHeading: 'الإيراد الشهري اللي قاعد يطير',
      lossPrefix: '−',
      lossSuffix: ' د.ك / شهر',
      lossNote: 'بناءً على 30% من الطلبات الضايعة بسبب بطء الرد',
      cta: 'وقف الخسارة — ابدأ مجاناً ←',
    },
    demo: {
      heading: 'جرّب البوت الحقيقي — الآن',
      sub: 'تحدّث مع فوكوبوت الحين. نفس الذكاء الاصطناعي اللي يشغّل أعمالاً حقيقية في الخليج.',
      nameLabel: 'اسمك',
      namePlaceholder: 'مثال: أحمد',
      phoneLabel: 'رقم واتساب',
      phonePlaceholder: '+965 XXXX XXXX',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'example@gmail.com',
      emailOptional: 'اختياري',
      businessLabel: 'ما نوع عملك؟',
      ctaStart: 'ابدأ المحادثة ←',
      inputPlaceholder: 'اكتب رسالة…',
      remainingPrefix: 'تبقّى لك ',
      remainingSuffix: ' رسائل',
      capHeading: 'خلصت رسائلك المجانية!',
      capSub: 'ابدأ تجربتك المجانية لمدة 7 أيام واحصل على بوت خاص لبزنسك.',
      ctaUpgrade: 'ابدأ التجربة المجانية ←',
      typing: 'فوكوبوت يكتب…',
      businessTypes: [
        { id: 'restaurant', label: 'مطعم', icon: '🍽️' },
        { id: 'cafe', label: 'كافيه', icon: '☕' },
        { id: 'gym', label: 'جيم', icon: '💪' },
        { id: 'clinic', label: 'عيادة', icon: '🏥' },
        { id: 'boutique', label: 'بوتيك', icon: '👗' },
        { id: 'bakery', label: 'مخبز', icon: '🍰' },
      ],
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
