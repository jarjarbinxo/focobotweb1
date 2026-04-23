import { motion } from 'motion/react'
import { Zap, ShoppingCart, Megaphone, BarChart2, Globe, Bell } from 'lucide-react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

const ICONS = { Zap, ShoppingCart, Megaphone, BarChart2, Globe, Bell } as const
type IconKey = keyof typeof ICONS

interface FeaturesProps { lang: Lang }

export default function Features({ lang }: FeaturesProps) {
  const t = copy[lang].features

  return (
    <section id="features" className="py-24 px-6 bg-[#08080c] relative overflow-hidden">
      {/* subtle orange glow behind section */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-orange/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white">{t.heading}</h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">{t.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {t.cards.map((card, i) => {
            const IconComponent = ICONS[card.icon as IconKey]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-orange/30 transition-colors"
              >
                {/* orange left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* icon */}
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center mb-4">
                  {IconComponent && <IconComponent className="w-6 h-6 text-orange" />}
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
