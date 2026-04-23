import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface FreeWeekBannerProps { lang: Lang }

export default function FreeWeekBanner({ lang }: FreeWeekBannerProps) {
  const t = copy[lang].freeWeek
  return (
    <section className="py-24 px-6 bg-orange-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6"
      >
        <span className="text-xs font-bold tracking-widest text-orange uppercase">{t.eyebrow}</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#111] leading-tight">{t.headline}</h2>
        <p className="text-gray-500 text-base">{t.sub}</p>
        <a
          href="#"
          className="mt-2 inline-block bg-orange text-white font-bold text-base px-10 py-4 rounded-xl hover:bg-orange/90 transition-colors"
        >
          {t.cta}
        </a>
      </motion.div>
    </section>
  )
}
