// src/components/Hero.tsx
import { motion } from 'motion/react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

interface HeroProps { lang: Lang }

function ChatBubble({ from, text, delay }: { from: 'customer' | 'bot'; text: string; delay: number }) {
  const isBot = from === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex items-end gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
          isBot ? 'bg-orange text-white' : 'bg-gray-200 text-gray-600'
        }`}
      >
        {isBot ? 'F' : 'C'}
      </div>
      <div
        className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
          isBot
            ? 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
            : 'bg-[#dcf8c6] text-gray-800 rounded-br-sm'
        }`}
      >
        {text}
      </div>
    </motion.div>
  )
}

export default function Hero({ lang }: HeroProps) {
  const t = copy[lang].hero

  return (
    <section className="min-h-screen pt-16 flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className={`flex flex-col ${lang === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>

          {/* Text side */}
          <div className="flex-1 text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-orange-light text-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-orange/20">
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111] leading-tight mb-2"
            >
              {t.headline}
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-orange leading-tight mb-6"
            >
              {t.highlight}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-500 mb-10 max-w-md"
            >
              {t.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <a
                href="#free-week"
                className="inline-flex items-center bg-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange/90 transition-colors text-sm shadow-lg shadow-orange/25"
              >
                {t.cta1}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center text-gray-600 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-400 hover:text-[#111] transition-colors text-sm"
              >
                {t.cta2}
              </a>
            </motion.div>
          </div>

          {/* Chat mockup side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 w-full max-w-sm"
          >
            <div className="bg-[#ece5dd] rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* WhatsApp header */}
              <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">F</div>
                <div>
                  <div className="text-white font-semibold text-sm">Focobot</div>
                  <div className="text-green-200 text-xs">online</div>
                </div>
              </div>
              {/* Messages */}
              <div className="p-4 flex flex-col gap-3 min-h-[320px]">
                {t.chat.map((msg, i) => (
                  <ChatBubble key={i} from={msg.from} text={msg.text} delay={0.5 + i * 0.2} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
