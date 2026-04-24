import { useState } from 'react'
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface ROICalculatorProps {
  lang: Lang
}

export default function ROICalculator({ lang }: ROICalculatorProps) {
  const t = copy[lang].roi
  const [orders, setOrders] = useState(20)
  const [avg, setAvg] = useState(5)

  const loss = Math.round(orders * avg * 0.30 * 30)

  return (
    <section className="py-24 px-6 bg-[#f9f8f6]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ef4444, #ff7a1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-gray-500 mt-4 leading-relaxed"
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto mt-12"
        >
          {/* Orders slider */}
          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-gray-500 text-sm">{t.ordersLabel}</label>
              <span className="text-orange font-bold text-2xl">{orders}</span>
            </div>
            <input
              type="range"
              min={1}
              max={200}
              value={orders}
              onChange={(e) => setOrders(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200"
              style={{ accentColor: '#ff7a1a' }}
            />
          </div>

          {/* Avg order value slider */}
          <div className="mb-2">
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-gray-500 text-sm">{t.avgLabel}</label>
              <span className="text-orange font-bold text-2xl">{avg}</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={avg}
              onChange={(e) => setAvg(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200"
              style={{ accentColor: '#ff7a1a' }}
            />
          </div>

          {/* Result display */}
          <motion.div
            key={loss}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="mt-8 rounded-2xl bg-red-50 border border-red-100 p-6 text-center"
          >
            <div className="text-gray-500 text-sm mb-2">{t.resultHeading}</div>
            <div className="text-5xl md:text-6xl font-black text-red-500">
              {t.lossPrefix}{loss.toLocaleString()}{t.lossSuffix}
            </div>
            <div className="text-gray-400 text-xs mt-2">{t.lossNote}</div>
          </motion.div>

          {/* CTA */}
          <div className="flex justify-center">
            <a
              href="#free-week"
              className="bg-orange text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-orange/90 transition-all hover:scale-105 mt-8 inline-block cursor-pointer"
            >
              {t.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
