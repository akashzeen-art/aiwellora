import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <p className="footer-copy">
        {t('footer.copyright')}{' '}
        <a href="#" onClick={(e) => e.preventDefault()}>
          AI Wellora
        </a>
      </p>
    </footer>
  )
}
