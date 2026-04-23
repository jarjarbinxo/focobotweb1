// src/App.tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen">
      <Navbar lang={lang} onToggleLang={toggle} />
      <Hero lang={lang} />
      <StatsStrip lang={lang} />
      <Features lang={lang} />
      <HowItWorks lang={lang} />
    </div>
  )
}
