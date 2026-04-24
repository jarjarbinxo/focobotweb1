import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface StatsStripProps { lang: Lang }

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!inView) return
    // extract numeric part and suffix
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
    if (!match) { setDisplayed(value); return }
    const target = parseFloat(match[1])
    const suffix = match[2]
    const duration = 1200
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      const current = Math.round(ease * target)
      setDisplayed(`${current}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDisplayed(value)
    }
    setTimeout(() => { raf = requestAnimationFrame(tick) }, delay * 1000)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center px-4"
    >
      <div className="text-3xl md:text-4xl font-black text-orange tabular-nums">{displayed}</div>
      <div className="text-gray-500 text-sm mt-1.5 font-medium">{label}</div>
    </motion.div>
  )
}

export default function StatsStrip({ lang }: StatsStripProps) {
  const stats = copy[lang].stats

  return (
    <section className="py-14 px-6 bg-[#f9f8f6] border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-200">
          {stats.map((stat, i) => (
            <AnimatedStat key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
