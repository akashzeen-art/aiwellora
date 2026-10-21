import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { navLinks } from '../data/categories'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className={`navbox${isHome ? '' : ' gradient_bg'}`}>
        <nav className="navbar">
          <Link className="navbar-brand" to="/" onClick={() => setOpen(false)}>
            <img className="logo" src={logo} alt="Wellora" />
          </Link>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            aria-controls="main-menu"
            aria-expanded={open}
            aria-label={t('nav.toggleMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </nav>
      </header>

      <div className={`menu-panel${open ? ' is-open' : ''}`} id="main-menu">
        <div className="menu-panel-inner">
          <div className={`navbox menu-panel-bar${isHome ? '' : ' gradient_bg'}`}>
            <nav className="navbar">
              <Link className="navbar-brand" to="/" onClick={() => setOpen(false)}>
                <img className="logo" src={logo} alt="Wellora" />
              </Link>
              <button
                className="navbar-toggler custom-toggler"
                type="button"
                aria-label={t('nav.closeMenu')}
                aria-expanded={open}
                onClick={() => setOpen(false)}
              >
                <span className="navbar-toggler-icon" />
              </button>
            </nav>
          </div>
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.labelKey}
                to={link.to}
                className="menu_button"
                onClick={() => setOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ) : (
              <a
                key={link.labelKey}
                href={link.href || '#'}
                className="menu_button"
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                }}
              >
                {t(link.labelKey)}
              </a>
            ),
          )}

          <div className="menu-lang" role="group" aria-label={t('lang.switchTo')}>
            <div className="menu_button menu-lang-title">{t('lang.languages')}</div>
            <button
              type="button"
              className={`menu_button menu-lang-btn${lang === 'en' ? ' is-active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              {t('lang.en')}
            </button>
            <div className="menu-lang-sep" aria-hidden="true">
              |
            </div>
            <button
              type="button"
              className={`menu_button menu-lang-btn${lang === 'es' ? ' is-active' : ''}`}
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
            >
              {t('lang.es')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
