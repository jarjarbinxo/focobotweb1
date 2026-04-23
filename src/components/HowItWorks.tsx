import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface HowItWorksProps { lang: Lang }

export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = copy[lang].howItWorks

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0f0f14]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white">{t.heading}</h2>
        </motion.div>

        <div className="relative mt-16">
          {/* desktop connector line */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px border-t border-dashed border-white/20" />

          <div className="grid md:grid-cols-3 gap-12 relative">
            {t.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center gap-4"
              >
                {/* number circle */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-orange/40 bg-orange/10 flex items-center justify-center text-orange font-black text-xl relative z-10">
                    {step.num}
                  </div>
                  {/* orange glow dot behind circle */}
                  <div className="absolute w-16 h-16 rounded-full bg-orange/20 blur-xl" />
                </div>

                <h3 className="text-white font-bold text-xl">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
