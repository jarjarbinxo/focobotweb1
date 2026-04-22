import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen">
      <Navbar lang={lang} onToggleLang={toggle} />
      <div className="pt-20 p-8 text-gray-400 text-sm">Building…</div>
    </div>
  )
}
