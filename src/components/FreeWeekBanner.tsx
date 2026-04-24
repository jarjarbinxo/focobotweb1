import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'
import Hyperspeed from './Hyperspeed'

interface FreeWeekBannerProps { lang: Lang }

export default function FreeWeekBanner({ lang }: FreeWeekBannerProps) {
  const t = copy[lang].freeWeek

  return (
    <section id="free-week" className="relative overflow-hidden py-24 px-6 bg-[#08080c]">
      <Hyperspeed className="absolute inset-0 w-full h-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="free-week-border relative rounded-3xl p-[1px] overflow-hidden">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[calc(1.5rem-1px)] p-10 md:p-14 text-center overflow-hidden">
            {/* inner orange tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange/[0.04] to-transparent pointer-events-none" />

            {/* content */}
            <span className="text-orange text-xs font-bold tracking-widest uppercase">{t.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">{t.headline}</h2>
            <p className="text-white/70 text-base mt-4 max-w-md mx-auto">{t.sub}</p>
            <a
              href="#"
              className="free-week-cta inline-block mt-8 bg-orange text-white font-bold text-base px-12 py-4 rounded-xl hover:bg-orange/90 transition-all hover:scale-105"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
