import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'wellora-lang'

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

function format(str, vars = {}) {
  if (!str) return str
  return str.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  )
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'es') return saved
    } catch {
      /* ignore */
    }
    return 'en'
  })

  const setLang = (next) => {
    if (next !== 'en' && next !== 'es') return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'es' ? 'es' : 'en'
  }, [lang])

  const value = useMemo(() => {
    const dict = translations[lang] || translations.en

    const t = (path, vars) => {
      const raw =
        getByPath(dict, path) ?? getByPath(translations.en, path) ?? path
      return typeof raw === 'string' ? format(raw, vars) : path
    }

    const categoryName = (nameKey) => t(`categories.${nameKey}`)

    return { lang, setLang, t, categoryName, speechLang: lang === 'es' ? 'es-ES' : 'en-US' }
  }, [lang])

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
