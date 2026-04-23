import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface HowItWorksProps { lang: Lang }

export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = copy[lang].howItWorks

  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#111]">{t.heading}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Dashed connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[16.7%] right-[16.7%] h-px border-t-2 border-dashed border-orange/20 pointer-events-none" />

          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white border-2 border-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-lg font-black text-orange">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-[#111] mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
