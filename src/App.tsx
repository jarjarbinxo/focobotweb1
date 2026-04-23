import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import ROICalculator from './components/ROICalculator'
import MottoSection from './components/MottoSection'
import FreeWeekBanner from './components/FreeWeekBanner'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  const { lang, toggle } = useLang()
  return (
    <div className="min-h-screen bg-[#08080c]">
      <Navbar lang={lang} onToggleLang={toggle} />
      <Hero lang={lang} />
      <StatsStrip lang={lang} />
      <Features lang={lang} />
      <HowItWorks lang={lang} />
      <Testimonials lang={lang} />
      <ROICalculator lang={lang} />
      <MottoSection lang={lang} />
      <FreeWeekBanner lang={lang} />
      <FAQ lang={lang} />
      <Footer lang={lang} onToggleLang={toggle} />
    </div>
  )
}
