import { useState, useEffect } from 'react'
import type { Lang } from '../data/copy'
import { copy } from '../data/copy'

interface NavbarProps {
  lang: Lang
  onToggleLang: () => void
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = copy[lang].nav
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080c]/90 border-b border-white/[0.06] navbar-scrolled'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-black text-xl tracking-tight text-white">
          FOCO<span className="text-orange">BOT</span>
        </a>

        {/* Center nav links — desktop only */}
        <nav className="hidden md:flex gap-8">
          {t.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: lang toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleLang}
            className="text-xs font-bold border border-white/20 rounded-lg px-3 py-1.5 text-white/70 hover:text-white hover:border-white/40 transition-all"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <a
            href="#free-week"
            className="bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-orange/90 transition-colors"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
