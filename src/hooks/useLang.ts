import { useState, useEffect } from 'react'
import type { Lang } from '../data/copy'

export function useLang() {
  const [lang, setLang] = useState<Lang>('ar')

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang(l => l === 'en' ? 'ar' : 'en')

  return { lang, toggle }
}
