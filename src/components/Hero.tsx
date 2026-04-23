import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'
import Aurora from './Aurora'

interface HeroProps { lang: Lang }

export default function Hero({ lang }: HeroProps) {
  const t = copy[lang].hero
  const allMessages = t.chat
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    setVisibleCount(1)
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= allMessages.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [lang, allMessages.length])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#08080c]">
      {/* Aurora background */}
      <div className="absolute inset-0">
        <Aurora />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080c]/40 via-transparent to-[#08080c]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div
          className={`flex flex-col items-center gap-16 ${
            lang === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 text-center lg:text-start"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange/90 border border-orange/30 bg-orange/10 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              {t.badge}
            </span>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
              {t.headline}
            </h1>

            {/* Highlight */}
            <h1 className="hero-highlight text-5xl md:text-7xl font-black leading-tight mb-4">
              {t.highlight}
            </h1>

            {/* Sub */}
            <p className="text-lg text-white/60 max-w-md leading-relaxed mt-4 mb-10">
              {t.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#free-week"
                className="hero-cta-primary bg-orange text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-orange/90 transition-all hover:scale-105 inline-flex items-center"
              >
                {t.cta1}
              </a>
              <a
                href="#how-it-works"
                className="text-white/70 hover:text-white text-base font-medium flex items-center gap-2 transition-colors px-2 py-4"
              >
                {t.cta2}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: WhatsApp mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-sm mx-auto flex-shrink-0"
          >
            {/* Phone shell */}
            <div className="hero-phone-shell relative bg-[#111118] rounded-[2.5rem] p-3 border border-white/10">
              {/* WhatsApp header */}
              <div className="bg-[#075e54] rounded-[2rem] overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                  <div className="w-9 h-9 rounded-full bg-orange/20 flex items-center justify-center text-orange font-bold text-sm flex-shrink-0">
                    F
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">Focobot</div>
                    <div className="text-green-300 text-xs">online</div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="bg-[#0b1e19] px-3 py-4 min-h-[380px] flex flex-col gap-2 overflow-hidden">
                  {allMessages.slice(0, visibleCount).map((msg, i) => (
                    <motion.div
                      key={`${lang}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.from === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`text-white text-sm px-4 py-2 max-w-[85%] ${
                          msg.from === 'customer'
                            ? 'bg-[#005c4b] rounded-2xl rounded-tr-sm'
                            : 'bg-[#1f2c34] rounded-2xl rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative glow blob */}
            <div className="hero-phone-glow absolute -inset-4 rounded-[3rem] -z-10 blur-2xl opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
