import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send } from 'lucide-react'
import { copy } from '../data/copy'
import type { Lang } from '../data/copy'

const API = 'https://web-production-f6e08.up.railway.app'

interface Message {
  from: 'user' | 'bot'
  text: string
}

type Phase = 'capture' | 'chatting' | 'capped'

interface DemoChatProps {
  lang: Lang
}

export default function DemoChat({ lang }: DemoChatProps) {
  const t = copy[lang].demo

  const [phase, setPhase] = useState<Phase>('capture')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('restaurant')
  const [signupId, setSignupId] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(10)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSignup() {
    if (!name.trim()) {
      setError(lang === 'ar' ? 'الاسم مطلوب' : 'Name is required')
      return
    }
    if (!phone.trim() && !email.trim()) {
      setError(lang === 'ar' ? 'رقم الهاتف أو البريد مطلوب' : 'Phone or email is required')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/demo/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (data.ok) {
        setSignupId(data.signup_id)
        setRemaining(data.message_cap)
        setPhase('chatting')
        const selectedType = copy[lang].demo.businessTypes.find(b => b.id === businessType)
        const welcomeText =
          lang === 'ar'
            ? `أهلاً ${name}! أنا فوكوبوت 🤖 جرّبني كأنك صاحب ${selectedType?.label || 'مشروع'}. اسألني أي شيء عن خدماتك!`
            : `Hi ${name}! I'm Focobot 🤖 Try me like you're a customer at a ${selectedType?.label || 'business'}. Ask me anything!`
        setMessages([{ from: 'bot', text: welcomeText }])
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch {
      setError(lang === 'ar' ? 'خطأ في الاتصال' : 'Connection error')
    } finally {
      setLoading(false)
    }
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || !signupId || loading) return
    setInput('')
    const newMessages: Message[] = [...messages, { from: 'user', text }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch(`${API}/demo/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          signup_id: signupId,
          history: newMessages.slice(-10).map(m => ({ from: m.from === 'user' ? 'user' : 'bot', text: m.text })),
        }),
      })
      const data = await res.json()
      if (data.error === 'cap_reached') {
        setMessages(prev => [...prev, { from: 'bot', text: data.reply || t.capHeading }])
        setPhase('capped')
      } else if (data.reply) {
        setMessages(prev => [...prev, { from: 'bot', text: data.reply }])
        setRemaining(data.remaining ?? 0)
        if (data.remaining === 0) setPhase('capped')
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: lang === 'ar' ? 'حدث خطأ، حاول مجدداً' : 'Connection error, please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">{t.heading}</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">{t.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-lg mx-auto mt-12 card rounded-3xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {phase === 'capture' && (
              <motion.div
                key="capture"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="p-8 md:p-10">
                  {/* Business type selector */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      {t.businessLabel}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {t.businessTypes.map(bt => (
                        <button
                          key={bt.id}
                          type="button"
                          onClick={() => setBusinessType(bt.id)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            businessType === bt.id
                              ? 'border-orange bg-orange/10 text-orange'
                              : 'border-gray-100 text-gray-500 hover:border-gray-200'
                          }`}
                        >
                          <span className="text-xl">{bt.icon}</span>
                          <span className="text-xs">{bt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name input */}
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  {/* Phone input */}
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange transition-colors"
                      dir="ltr"
                    />
                  </div>

                  {/* Email input (optional) */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                      {t.emailLabel}
                      <span className="text-xs font-normal text-gray-400">({t.emailOptional})</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange transition-colors"
                      dir="ltr"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                  <button
                    type="button"
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-orange text-white font-bold py-4 rounded-xl text-base hover:bg-orange/90 transition-colors disabled:opacity-60"
                  >
                    {loading ? '...' : t.ctaStart}
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'chatting' && (
              <motion.div
                key="chatting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-orange/20 flex items-center justify-center text-orange font-bold text-sm">
                    F
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-semibold text-sm">Focobot</div>
                    <div className="text-green-500 text-xs">online</div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {t.remainingPrefix}{remaining}{t.remainingSuffix}
                  </div>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-gray-50">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                          msg.from === 'user'
                            ? 'bg-orange text-white rounded-tr-sm'
                            : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                        <div className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
                        <div className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
                        <div className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex gap-3 px-4 py-4 border-t border-gray-100">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder={t.inputPlaceholder}
                    disabled={loading}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-orange transition-colors disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 rounded-xl bg-orange text-white flex items-center justify-center hover:bg-orange/90 transition-colors disabled:opacity-50"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'capped' && (
              <motion.div
                key="capped"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="p-10 text-center flex flex-col items-center gap-5">
                  <div className="text-4xl">🎉</div>
                  <h3 className="text-xl font-bold text-gray-900">{t.capHeading}</h3>
                  <p className="text-gray-500 text-sm max-w-xs">{t.capSub}</p>
                  <a
                    href="#free-week"
                    className="bg-orange text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-orange/90 transition-all hover:scale-105"
                  >
                    {t.ctaUpgrade}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
