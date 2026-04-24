import { motion } from 'motion/react'
import { Zap, ShoppingCart, Megaphone, BarChart2, Globe, Bell } from 'lucide-react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

const ICONS = { Zap, ShoppingCart, Megaphone, BarChart2, Globe, Bell } as const
type IconKey = keyof typeof ICONS

interface FeaturesProps { lang: Lang }

const SPRING = { type: 'spring', stiffness: 400, damping: 25 } as const

/** Decorative orbiting dots shown on the right side of wide cards */
function OrbitDots() {
  const dots = ['⚡', '💬', '📊']
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24 hidden md:flex items-center justify-center pointer-events-none">
      {dots.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-lg select-none"
          style={{
            // evenly space the three dots around a circle of radius ~36px
            transformOrigin: '0 0',
            left: `calc(50% + ${Math.cos((i * 2 * Math.PI) / 3) * 36}px)`,
            top: `calc(50% + ${Math.sin((i * 2 * Math.PI) / 3) * 36}px)`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 1.5,
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  )
}

export default function Features({ lang }: FeaturesProps) {
  const t = copy[lang].features

  return (
    <section id="features" className="py-24 px-6 mesh-bg relative overflow-hidden">
      {/* radial orange glow at top */}
      <div className="features-glow absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-orange text-xs font-bold tracking-widest uppercase mb-3 block">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">{t.heading}</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">{t.sub}</p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.cards.map((card, i) => {
            const IconComponent = ICONS[card.icon as IconKey]

            // Layout variants per slot
            const isWide0  = i === 0   // cols 1-2, tall, large icon + orbit
            const isWide3  = i === 3   // cols 1-2, horizontal flex layout

            const colSpanClass = (isWide0 || isWide3)
              ? 'md:col-span-2'
              : 'col-span-1'

            const minHeightClass = isWide0 ? 'min-h-[240px]' : 'min-h-[200px]'

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 0.97, rotate: '-0.5deg' }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: i * 0.08, duration: 0.45, ...SPRING }}
                className={[
                  'card rounded-2xl p-7 relative overflow-hidden group',
                  'transition-colors duration-200',
                  colSpanClass,
                  minHeightClass,
                  isWide3 ? 'flex flex-row gap-8 items-center' : 'flex flex-col',
                ].join(' ')}
              >
                {/* Hover: orange top border */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-orange rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Dot pattern overlay on wide cards */}
                {(isWide0 || isWide3) && (
                  <div className="bento-dots absolute inset-0 opacity-[0.03] pointer-events-none" />
                )}

                {/* Orbiting emoji dots — only on card 0 */}
                {isWide0 && <OrbitDots />}

                {/* ── Icon ── */}
                <div
                  className={[
                    'flex items-center justify-center rounded-2xl shrink-0',
                    'group-hover:bg-orange/20 transition-colors duration-200',
                    isWide0
                      ? 'w-16 h-16 bg-orange/15 mb-5'
                      : 'w-12 h-12 bg-orange/10 mb-4',
                    isWide3 ? '!mb-0' : '',
                  ].join(' ')}
                >
                  {IconComponent && (
                    <IconComponent
                      className={isWide0 ? 'w-8 h-8 text-orange' : 'w-5 h-5 text-orange'}
                    />
                  )}
                </div>

                {/* ── Text ── */}
                <div className={isWide3 ? 'flex-1 min-w-0' : ''}>
                  <h3
                    className={[
                      'text-gray-900 font-bold mb-2',
                      isWide0 ? 'text-2xl' : 'text-base',
                    ].join(' ')}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
