import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'
import Galaxy from './Galaxy'

interface MottoSectionProps {
  lang: Lang
}

// ── Proof card ────────────────────────────────────────────────────────────────
interface ProofCardProps {
  value: string
  label: string
  index: number
}

function ProofCard({ value, label, index }: ProofCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.12, duration: 0.5, ease: 'easeOut' }}
      className="card rounded-2xl p-4 text-center"
    >
      <div className="text-2xl font-black text-orange leading-none">{value}</div>
      <div className="text-gray-500 text-xs mt-1 leading-snug">{label}</div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MottoSection({ lang }: MottoSectionProps) {
  const t = copy[lang].motto

  // eyebrow: not in copy.ts motto type — use static bilingual fallback
  const eyebrow = lang === 'ar' ? 'وعدنا لك' : 'Our Promise'

  // proof labels — not in copy.ts — use static bilingual fallbacks
  const proof1Label = lang === 'ar' ? 'أضعاف القيمة' : 'the value'
  const proof2Label = lang === 'ar' ? 'من التكلفة' : 'of the cost'
  const proof3Label = lang === 'ar' ? 'دائماً يعمل' : 'always on'

  // CTA text
  const ctaText = lang === 'ar' ? 'احصل على أسبوعك المجاني ←' : 'Claim Your Free Week →'

  // Word-stagger for line1
  const line1Words = t.line1.split(' ')

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Galaxy background */}
      <Galaxy className="absolute inset-0 w-full h-full opacity-30" />

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-orange text-xs font-bold tracking-widest uppercase block"
        >
          {eyebrow}
        </motion.span>

        {/* Line 1 — word stagger */}
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-2 leading-tight">
          {line1Words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.45, ease: 'easeOut' }}
              className="inline-block"
              // add a non-breaking space between words
              style={{ marginInlineEnd: i < line1Words.length - 1 ? '0.3em' : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Line 2 — gradient orange */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + line1Words.length * 0.06, duration: 0.5, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-black leading-tight hero-highlight"
        >
          {t.line2}
        </motion.h2>

        {/* 3 proof cards */}
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-xl mx-auto">
          <ProofCard value="10x"   label={proof1Label} index={0} />
          <ProofCard value="1/10"  label={proof2Label} index={1} />
          <ProofCard value="24/7"  label={proof3Label} index={2} />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-10"
        >
          <a
            href="#free-week"
            className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-full text-base shadow-lg hover:shadow-xl hover:bg-orange/90 transition-all duration-200"
          >
            {ctaText}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
