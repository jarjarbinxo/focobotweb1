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
