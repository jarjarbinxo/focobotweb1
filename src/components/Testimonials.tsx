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
          transition={{ duration: 0.5 }}
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
              className="p-7 rounded-2xl border border-gray-100 flex flex-col gap-5 bg-white"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-orange text-sm">★</span>
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
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
