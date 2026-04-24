import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Features from './components/Features'
import UseCases from './components/UseCases'
import HowItWorks from './components/HowItWorks'
import FloatingReviews from './components/FloatingReviews'
import ROICalculator from './components/ROICalculator'
import DemoChat from './components/DemoChat'
import MottoSection from './components/MottoSection'
import FreeWeekBanner from './components/FreeWeekBanner'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} onToggleLang={toggle} />
      <Hero lang={lang} />
      <StatsStrip lang={lang} />
      <Features lang={lang} />
      <UseCases lang={lang} />
      <HowItWorks lang={lang} />
      <FloatingReviews lang={lang} />
      <ROICalculator lang={lang} />
      <DemoChat lang={lang} />
      <MottoSection lang={lang} />
      <FreeWeekBanner lang={lang} />
      <FAQ lang={lang} />
      <Footer lang={lang} onToggleLang={toggle} />
    </div>
  )
}
