import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Play, UtensilsCrossed, Coffee, Dumbbell, Stethoscope, ShoppingBag, Scissors } from 'lucide-react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'
import Aurora from './Aurora'

interface HeroProps { lang: Lang }

// ── Orbit nodes ───────────────────────────────────────────────────────────────
const ORBIT_NODES = [
  { Icon: UtensilsCrossed, label: 'Restaurant', color: 'text-orange-500 bg-orange-50' },
  { Icon: Coffee,          label: 'Café',       color: 'text-amber-600 bg-amber-50' },
  { Icon: Dumbbell,        label: 'Gym',        color: 'text-blue-500 bg-blue-50' },
  { Icon: Stethoscope,     label: 'Clinic',     color: 'text-green-600 bg-green-50' },
  { Icon: ShoppingBag,     label: 'Boutique',   color: 'text-pink-500 bg-pink-50' },
  { Icon: Scissors,        label: 'Salon',      color: 'text-purple-500 bg-purple-50' },
]

// ── OrbitRing — pure RAF, no framer-motion rotation (zero desync) ─────────────
function OrbitRing() {
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const R = 148          // orbit radius px
    const N = ORBIT_NODES.length
    const PERIOD = 22      // seconds per full orbit
    let startTs: number | null = null

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts
      const elapsed = (ts - startTs) / 1000
      const baseAngle = (elapsed / PERIOD) * 2 * Math.PI

      nodeRefs.current.forEach((el, i) => {
        if (!el) return
        // evenly space + rotate continuously; start from top (−π/2)
        const angle = baseAngle + (i / N) * 2 * Math.PI - Math.PI / 2
        const x = R * Math.cos(angle)
        const y = R * Math.sin(angle)
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Dashed orbit ring */}
      <svg className="absolute w-[300px] h-[300px]" viewBox="0 0 300 300" overflow="visible">
        <circle
          cx="150" cy="150" r="148"
          fill="none"
          stroke="rgba(255,122,26,0.13)"
          strokeWidth="1.5"
          strokeDasharray="5 9"
        />
        {/* Animated bright arc */}
        <motion.circle
          cx="150" cy="150" r="148"
          fill="none"
          stroke="url(#heroArcGrad)"
          strokeWidth="2.5"
          strokeDasharray="90 840"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '150px 150px' }}
        />
        <defs>
          <linearGradient id="heroArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#ff7a1a" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ff7a1a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pulse rings */}
      <motion.div
        className="absolute orbit-pulse-ring rounded-full border border-[#ff7a1a]/10"
        animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbit nodes — centered, offset by RAF */}
      {ORBIT_NODES.map(({ Icon, label, color }, i) => (
        <div
          key={i}
          ref={el => { nodeRefs.current[i] = el }}
          className="absolute"
          style={{ top: '50%', left: '50%' }}
        >
          <div className="flex flex-col items-center gap-1.5 select-none">
            <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center shadow-md border border-white`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-semibold text-gray-500 bg-white/95 rounded-full px-2 py-0.5 whitespace-nowrap shadow-sm border border-gray-100">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── iPhone mockup ─────────────────────────────────────────────────────────────
interface IPhoneProps {
  messages: { from: string; text: string }[]
  visibleCount: number
  lang: Lang
}

function IPhone({ messages, visibleCount, lang }: IPhoneProps) {
  return (
    <div className="relative iphone-wrapper">
      {/* Outer titanium frame */}
      <div className="relative rounded-[3rem] shadow-2xl iphone-frame">
        {/* Power button */}
        <div className="absolute iphone-btn-power" />
        {/* Volume buttons */}
        <div className="absolute iphone-btn-vol-silent" />
        <div className="absolute iphone-btn-vol-up" />
        <div className="absolute iphone-btn-vol-down" />

        {/* Screen glass */}
        <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-black relative flex flex-col">
          {/* Status bar spacer + Dynamic Island */}
          <div className="relative flex-shrink-0 h-10 bg-[#075e54]">
            <div className="absolute bg-black rounded-full z-30 iphone-dynamic-island" />
          </div>

          {/* WhatsApp UI */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[#075e54] px-3 py-2.5 flex items-center gap-2.5 border-b border-white/5">
              <div className="w-8 h-8 rounded-full bg-[#ff7a1a]/20 flex items-center justify-center text-[#ff7a1a] font-bold text-sm flex-shrink-0">
                F
              </div>
              <div>
                <div className="text-white text-xs font-semibold">Focobot</div>
                <div className="text-green-300 text-[10px]">online</div>
              </div>
            </div>

            {/* Chat */}
            <div
              className="flex-1 bg-[#0b1e19] px-2.5 py-3 flex flex-col gap-1.5 overflow-hidden"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              {messages.slice(0, visibleCount).map((msg, i) => (
                <motion.div
                  key={`${lang}-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.from === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`text-white text-[11px] leading-relaxed px-3 py-1.5 max-w-[82%] ${
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
      </div>

      {/* Glow behind phone */}
      <div className="absolute -z-10 blur-3xl rounded-full opacity-25 iphone-glow" />
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero({ lang }: HeroProps) {
  const t = copy[lang].hero
  const allMessages = t.chat
  const [visibleCount, setVisibleCount] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setVisibleCount(1)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= allMessages.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return prev
        }
        return prev + 1
      })
    }, 1200)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [lang, allMessages.length])

  const headlineWords = t.headline.split(' ')
  const highlightWords = t.highlight.split(' ')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Aurora shader bg */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <Aurora />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div className={`flex flex-col items-center gap-12 ${lang === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

          {/* ── LEFT: Text ── */}
          <div className="flex-1 min-w-0 text-center lg:text-start">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#ff7a1a] border border-[#ff7a1a]/30 bg-[#ff7a1a]/5 rounded-full px-4 py-2 mb-6 relative overflow-hidden"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a] animate-pulse flex-shrink-0" />
              {t.badge}
              <motion.div
                className="absolute inset-0 pointer-events-none hero-badge-shimmer"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
              />
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] text-gray-900">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`h-${i}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Gradient highlight */}
            <h1 className="hero-highlight text-5xl md:text-7xl font-black leading-[1.05] mb-4">
              {highlightWords.map((word, i) => (
                <motion.span
                  key={`hi-${i}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: (headlineWords.length + i) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: (headlineWords.length + highlightWords.length) * 0.08 + 0.2 }}
              className="text-lg text-gray-500 max-w-md leading-relaxed mt-4 mb-10"
            >
              {t.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <a
                href="#free-week"
                className="hero-cta-primary bg-[#ff7a1a] text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-[#ff7a1a]/90 transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                {t.cta1}
              </a>
              <a
                href="#how-it-works"
                className="text-gray-500 hover:text-gray-900 text-base font-medium flex items-center gap-2 transition-colors px-2 py-4 cursor-pointer"
              >
                {t.cta2}
                <Play size={16} className="fill-current" />
              </a>
            </motion.div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {['A', 'K', 'S'].map((init, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#ff7a1a]/15 border-2 border-white flex items-center justify-center text-[#ff7a1a] font-bold text-xs">
                    {init}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {lang === 'ar' ? '+٥٠٠ شركة تثق بفوكوبوت' : '500+ businesses trust Focobot'}
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: iPhone + Orbit ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0 flex items-center justify-center hero-orbit-area"
          >
            {/* Orbit ring — behind phone */}
            <OrbitRing />

            {/* iPhone — on top */}
            <div className="relative z-10">
              <IPhone
                messages={allMessages}
                visibleCount={visibleCount}
                lang={lang}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}
