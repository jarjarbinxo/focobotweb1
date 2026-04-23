import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface StatsStripProps { lang: Lang }

export default function StatsStrip({ lang }: StatsStripProps) {
  const stats = copy[lang].stats

  return (
    <section className="py-16 px-6 bg-[#0f0f14] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              className={`text-center py-4 px-6 ${
                index < stats.length - 1 ? 'border-r border-white/[0.06]' : ''
              }`}
            >
              <div className="text-3xl md:text-4xl font-black text-orange">{stat.value}</div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
