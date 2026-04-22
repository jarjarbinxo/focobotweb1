import { useState, useEffect } from 'react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface NavbarProps {
  lang: Lang
  onToggleLang: () => void
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = copy[lang].nav
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-black tracking-tight text-[#111]">
          FOCO<span className="text-orange">BOT</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {t.links.map((link, i) => (
            <a
              key={i}
              href={['#how-it-works', '#features', '#faq'][i]}
              className="text-sm font-medium text-gray-500 hover:text-[#111] transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="text-xs font-semibold text-gray-400 hover:text-[#111] transition-colors px-2 py-1 rounded border border-gray-200 hover:border-gray-400"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <a
            href="#free-week"
            className="hidden md:inline-flex items-center bg-orange text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-orange/90 transition-colors"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
