import { motion } from 'motion/react'
import { UtensilsCrossed, Coffee, Dumbbell, Stethoscope, ShoppingBag, Scissors, ChefHat, Store } from 'lucide-react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface UseCasesProps { lang: Lang }

const ICONS = [UtensilsCrossed, Coffee, Dumbbell, Stethoscope, ShoppingBag, Scissors, ChefHat, Store]

const BG_COLORS = [
  'bg-orange/10 text-orange',
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-pink-100 text-pink-600',
  'bg-purple-100 text-purple-600',
  'bg-yellow-100 text-yellow-700',
  'bg-gray-100 text-gray-600',
]

export default function UseCases({ lang }: UseCasesProps) {
  const t = copy[lang].useCases

  return (
    <section className="py-24 px-6 bg-[#f9f8f6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-orange text-xs font-bold tracking-widest uppercase">{lang === 'ar' ? 'حلول لكل قطاع' : 'For Every Business'}</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3">{t.heading}</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">{t.sub}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-5xl mx-auto">
          {t.items.map((item, i) => {
            const Icon = ICONS[i] ?? Store
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="card rounded-2xl p-5 flex flex-col items-center text-center gap-3 cursor-pointer group transition-all duration-200 hover:shadow-md hover:border-orange/30"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${BG_COLORS[i] ?? 'bg-gray-100 text-gray-600'} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-gray-900 font-bold text-sm">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
