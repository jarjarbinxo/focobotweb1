import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface HowItWorksProps { lang: Lang }

// ── Single step card ──────────────────────────────────────────────────────────
interface StepCardProps {
  step: { num: string; title: string; desc: string }
  index: number
}

function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
    >
      {/* Step circle with pulse ring */}
      <div className="relative w-16 h-16">
        {/* Outer pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-orange/30 animate-ping [animation-duration:2s]" />
        {/* Inner filled circle */}
        <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-orange to-orange/70 text-white flex items-center justify-center font-black text-xl shadow-lg">
          {step.num}
        </div>
      </div>

      <h3 className="text-gray-900 font-bold text-xl mt-4">{step.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mt-2 max-w-xs">{step.desc}</p>
    </motion.div>
  )
}

// ── SVG Connector (desktop only) ─────────────────────────────────────────────
function ConnectorLine() {
  return (
    <div className="hidden md:block absolute top-8 left-0 right-0 pointer-events-none z-0">
      <svg
        className="w-full overflow-visible"
        height="64"
        viewBox="0 0 300 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static dashed gray underlay */}
        <path
          d="M 0 32 C 120 32 180 32 300 32"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
        {/* Animated orange fill path */}
        <motion.path
          d="M 0 32 C 120 32 180 32 300 32"
          fill="none"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = copy[lang].howItWorks
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  // eyebrow: no key in copy, use static bilingual fallback
  const eyebrow = lang === 'ar' ? 'كيف يعمل' : 'How It Works'

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs font-bold tracking-widest uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-gray-900">
            {t.heading}
          </h2>
        </motion.div>

        {/* Steps grid + connector */}
        <div className="relative">
          <ConnectorLine />
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {t.steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
