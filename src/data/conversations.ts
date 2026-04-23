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
