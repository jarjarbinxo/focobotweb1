import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface MottoSectionProps {
  lang: Lang
}

export default function MottoSection({ lang }: MottoSectionProps) {
  const t = copy[lang].motto

  return (
    <section className="relative py-32 px-6 bg-[#08080c] overflow-hidden">
      {/* Radial orange glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-orange/[0.07] blur-[120px]" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-orange/80 text-sm font-semibold tracking-widest uppercase">
            Our Promise
          </span>
        </motion.div>

        {/* Line 1 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-5xl md:text-7xl font-black text-white leading-tight mt-4"
        >
          {t.line1}
        </motion.h2>

        {/* Line 2 — gradient text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl md:text-7xl font-black leading-tight"
          style={{
            background: 'linear-gradient(135deg, #ff7a1a, #ffb347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t.line2}
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-24 h-1 bg-orange/40 rounded-full mx-auto my-8"
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {t.sub}
        </motion.p>
      </div>
    </section>
  )
}
