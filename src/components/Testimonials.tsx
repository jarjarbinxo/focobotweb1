import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface TestimonialsProps {
  lang: Lang
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = copy[lang].testimonials

  return (
    <section className="py-24 px-6 bg-[#08080c]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-black text-white text-center"
        >
          {t.heading}
        </motion.h2>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-8 flex flex-col gap-5"
            >
              {/* 5 stars */}
              <div className="flex gap-1 text-orange text-sm">{'★'.repeat(5)}</div>

              {/* quote */}
              <blockquote className="text-white/70 text-sm leading-relaxed flex-1 italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* attribution */}
              <div className="border-t border-white/[0.06] pt-4">
                <div className="text-white font-semibold text-sm">{item.name}</div>
                <div className="text-white/40 text-xs mt-0.5">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
