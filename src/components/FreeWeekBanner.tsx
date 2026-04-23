import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface FreeWeekBannerProps { lang: Lang }

export default function FreeWeekBanner({ lang }: FreeWeekBannerProps) {
  const t = copy[lang].freeWeek

  return (
    <section id="free-week" className="py-24 px-6 bg-[#0f0f14]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="free-week-border relative rounded-3xl p-[1px] overflow-hidden">
          <div className="relative bg-[#0f0f14] rounded-[calc(1.5rem-1px)] p-10 md:p-14 text-center overflow-hidden">
            {/* inner orange glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange/[0.08] to-transparent pointer-events-none" />

            {/* content */}
            <span className="text-orange text-xs font-bold tracking-widest uppercase">{t.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 leading-tight">{t.headline}</h2>
            <p className="text-white/60 text-base mt-4 max-w-md mx-auto">{t.sub}</p>
            <a
              href="#"
              className="free-week-cta inline-block mt-8 bg-orange text-white font-bold text-base px-12 py-4 rounded-xl hover:bg-orange/90 transition-all hover:scale-105 shadow-lg"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
