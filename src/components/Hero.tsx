import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Play, UtensilsCrossed, Coffee, Dumbbell, Stethoscope, ShoppingBag, Scissors } from 'lucide-react'
import { copy, floatingReviews } from '../data/copy'
import type { Lang } from '../data/copy'
import Aurora from './Aurora'

interface HeroProps { lang: Lang }

// Seeded positions — no Math.random(), deterministic across renders
const BUBBLE_CONFIG = Array.from({ length: 12 }, (_, i) => ({
  left: 3 + ((i * 8.3 + i * i * 0.7) % 94),           // 3% – 97%
  duration: 14 + (i * 0.67 + (i % 3) * 1.2) % 8,      // 14–22s
  delay: -(i * 1.85 + (i % 4) * 0.6),                  // negative = already in progress
  sizeClass: (['text-[10px]', 'text-xs', 'text-[11px]'] as const)[i % 3],
  reviewIndex: i,
}))

// ── BubbleReview ─────────────────────────────────────────────────────────────
interface BubbleReviewProps {
  item: (typeof floatingReviews)[number]
  delay: number
  left: number
  duration: number
  sizeClass: string
}

function BubbleReview({ item, delay, left, duration, sizeClass }: BubbleReviewProps) {
  return (
    <motion.div
      className="absolute hero-bubble-rising pointer-events-none"
      style={{ '--bubble-left': `${left}%` } as React.CSSProperties}
      animate={{ y: [0, '-100vh'] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    >
      <motion.div
        animate={{ opacity: [0, 1, 1, 1, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay,
          times: [0, 0.15, 0.50, 0.85, 1],
        }}
        className={`bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md flex items-center gap-2 whitespace-nowrap ${sizeClass}`}
      >
        <span className="text-[#ff7a1a] leading-none">
          {'★'.repeat(item.stars)}
        </span>
        <span className="font-medium text-gray-800 max-w-[80px] truncate">{item.name}</span>
        <span className="text-gray-400 max-w-[72px] truncate">{item.company}</span>
      </motion.div>
    </motion.div>
  )
}

// ── OrbitRing — animated SVG rings + business nodes ─────────────────────────
const ORBIT_NODES = [
  { Icon: UtensilsCrossed, label: 'Restaurant', angle: 0,   r: 140, speed: 22 },
  { Icon: Coffee,          label: 'Café',       angle: 60,  r: 140, speed: 22 },
  { Icon: Dumbbell,        label: 'Gym',        angle: 120, r: 140, speed: 22 },
  { Icon: Stethoscope,     label: 'Clinic',     angle: 180, r: 140, speed: 22 },
  { Icon: ShoppingBag,     label: 'Boutique',   angle: 240, r: 140, speed: 22 },
  { Icon: Scissors,        label: 'Salon',      angle: 300, r: 140, speed: 22 },
]

function OrbitRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Rotating container — spins the whole ring */}
      <motion.div
        className="relative w-[280px] h-[280px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {/* SVG ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
          <circle
            cx="140" cy="140" r="132"
            fill="none"
            stroke="rgba(255,122,26,0.12)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
          {/* Animated arc highlight */}
          <motion.circle
            cx="140" cy="140" r="132"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="2"
            strokeDasharray="80 744"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7a1a" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff7a1a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes — counter-rotate so icons stay upright */}
        {ORBIT_NODES.map(({ Icon, label, angle }, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 140 + 132 * Math.cos(rad)
          const y = 140 + 132 * Math.sin(rad)
          return (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#ff7a1a]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-semibold text-gray-500 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded-full">
                  {label}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Outer pulse ring */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-[#ff7a1a]/10"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[340px] h-[340px] rounded-full border border-[#ff7a1a]/06"
        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.08, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [lang, allMessages.length])

  const headlineWords = t.headline.split(' ')
  const highlightWords = t.highlight.split(' ')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* LAYER 1 — Aurora shader */}
      <div className="absolute inset-0 opacity-60">
        <Aurora />
      </div>

      {/* LAYER 2 — Rising bubble reviews */}
      {BUBBLE_CONFIG.map((cfg, i) => (
        <BubbleReview
          key={i}
          item={floatingReviews[cfg.reviewIndex % floatingReviews.length]}
          left={cfg.left}
          duration={cfg.duration}
          delay={cfg.delay}
          sizeClass={cfg.sizeClass}
        />
      ))}

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* LAYER 3 — Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div
          className={`flex flex-col items-center gap-16 ${
            lang === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >

          {/* ── LEFT: Text ── */}
          <div className="flex-1 text-center lg:text-start">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#ff7a1a] border border-[#ff7a1a]/30 bg-[#ff7a1a]/5 rounded-full px-4 py-2 mb-6 relative overflow-hidden"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a] animate-pulse flex-shrink-0" />
              {t.badge}
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none hero-badge-shimmer"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
              />
            </motion.div>

            {/* Headline — word-by-word stagger */}
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] text-gray-900">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`h-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Highlight line */}
            <h1 className="hero-highlight text-5xl md:text-7xl font-black leading-[1.05] mb-4">
              {highlightWords.map((word, i) => (
                <motion.span
                  key={`hi-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: (headlineWords.length + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Sub text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: (headlineWords.length + highlightWords.length) * 0.08 + 0.2 }}
              className="text-lg text-gray-500 max-w-md leading-relaxed mt-4 mb-10"
            >
              {t.sub}
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <a
                href="#free-week"
                className="hero-cta-primary bg-[#ff7a1a] text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-[#ff7a1a]/90 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                {t.cta1}
              </a>
              <a
                href="#how-it-works"
                className="text-gray-500 hover:text-gray-900 text-base font-medium flex items-center gap-2 transition-colors px-2 py-4"
              >
                {t.cta2}
                <Play size={16} className="fill-current" />
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {/* Mini avatars */}
              <div className="flex -space-x-2">
                {['A', 'K', 'S'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#ff7a1a]/20 border-2 border-white flex items-center justify-center text-[#ff7a1a] font-bold text-xs"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                500+ businesses trust Focobot
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: Phone + orbit shader ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-[380px] mx-auto flex-shrink-0 flex items-center justify-center"
            style={{ minHeight: 480 }}
          >
            {/* Orbit ring behind phone */}
            <OrbitRing />

            {/* Phone shell — centered on top of orbit */}
            <motion.div
              className="relative z-10 hero-phone-shell hero-phone-3d bg-white rounded-[2.5rem] p-3 border border-gray-100"
              style={{ width: 220 }}
              whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* WhatsApp UI */}
              <div className="bg-[#075e54] rounded-[2rem] overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#ff7a1a]/20 flex items-center justify-center text-[#ff7a1a] font-bold text-sm flex-shrink-0">
                    F
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">Focobot</div>
                    <div className="text-green-300 text-xs">online</div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="bg-[#0b1e19] px-3 py-4 min-h-[320px] flex flex-col gap-2 overflow-hidden">
                  {allMessages.slice(0, visibleCount).map((msg, i) => (
                    <motion.div
                      key={`${lang}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.from === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`text-white text-xs px-3 py-2 max-w-[85%] ${
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
            </motion.div>

            {/* Central orange glow */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-[#ff7a1a]/15 blur-3xl" />
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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}
