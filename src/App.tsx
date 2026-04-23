// src/App.tsx
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen">
      <Navbar lang={lang} onToggleLang={toggle} />
      <Hero lang={lang} />
    </div>
  )
}
