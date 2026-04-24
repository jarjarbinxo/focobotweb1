import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { Lang } from '../data/copy'
import { copy } from '../data/copy'

interface NavbarProps {
  lang: Lang
  onToggleLang: () => void
}

const FOCO_CHARS = ['F', 'O', 'C', 'O']
const BOT_CHARS = ['B', 'O', 'T']

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = copy[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const mountedRef = useRef(false)

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Logo stagger — trigger once on mount
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      setLogoVisible(true)
    }
  }, [])

  const allChars = [...FOCO_CHARS, ...BOT_CHARS]

  const pillClass = scrolled
    ? 'bg-white/90 backdrop-blur-xl border border-gray-200/60 shadow-md rounded-2xl transition-all duration-300'
    : 'bg-white/70 backdrop-blur-md border border-white/50 shadow-sm rounded-2xl transition-all duration-300'

  return (
    <div className="fixed top-4 inset-x-4 z-50 mx-auto max-w-6xl">
      {/* Pill navbar */}
      <nav className={`${pillClass} px-5 py-3 flex items-center justify-between`}>

        {/* Logo */}
        <a href="#" className="relative flex items-center font-black text-xl tracking-tight select-none">
          {/* FOCO letters — gray-900 */}
          {FOCO_CHARS.map((char, i) => (
            <motion.span
              key={`foco-${i}`}
              className="text-gray-900"
              initial={{ opacity: 0, y: 8 }}
              animate={logoVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                delay: i * 0.04,
                duration: 0.32,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              {char}
            </motion.span>
          ))}
          {/* BOT letters — orange */}
          {BOT_CHARS.map((char, i) => (
            <motion.span
              key={`bot-${i}`}
              className="text-orange"
              initial={{ opacity: 0, y: 8 }}
              animate={logoVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                delay: (FOCO_CHARS.length + i) * 0.04,
                duration: 0.32,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              {char}
            </motion.span>
          ))}
          {/* Orange pulse dot */}
          <motion.span
            className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-orange animate-pulse"
            initial={{ opacity: 0, scale: 0 }}
            animate={logoVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{
              delay: allChars.length * 0.04 + 0.1,
              duration: 0.28,
              type: 'spring',
              stiffness: 300,
              damping: 18,
            }}
          />
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex gap-7">
          {t.links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-gray-500 text-sm font-medium
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-orange after:w-0
                hover:after:w-full after:transition-all after:duration-300"
              whileHover={{ color: '#111111' }}
              transition={{ duration: 0.15 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right side: lang toggle + CTA + hamburger */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            type="button"
            onClick={onToggleLang}
            className="text-xs font-bold border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

          {/* CTA — desktop */}
          <motion.a
            href="#free-week"
            className="hidden md:inline-flex items-center bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-xl hero-cta-primary transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta}
          </motion.a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            {/* Top line */}
            <motion.div
              className="w-5 h-[2px] bg-gray-800 rounded-full origin-center"
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            />
            {/* Middle line */}
            <motion.div
              className="w-5 h-[2px] bg-gray-800 rounded-full"
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
            />
            {/* Bottom line */}
            <motion.div
              className="w-5 h-[2px] bg-gray-800 rounded-full origin-center"
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — slides down from navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-xl mt-2 p-4 flex flex-col gap-3"
          >
            {/* Nav links stacked */}
            {t.links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors py-1.5 px-2 rounded-lg hover:bg-gray-50"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Divider */}
            <div className="h-px bg-gray-100 my-1" />

            {/* Lang toggle + CTA */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => { onToggleLang(); setIsOpen(false) }}
                className="self-start text-xs font-bold border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all"
              >
                {lang === 'en' ? 'العربية' : 'English'}
              </button>

              <motion.a
                href="#free-week"
                onClick={() => setIsOpen(false)}
                className="bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-xl hero-cta-primary transition-all text-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.cta}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
