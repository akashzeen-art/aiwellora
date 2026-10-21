import { useLanguage } from '../i18n/LanguageContext'

export default function Pagination({ page = 1, totalPages = 2, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const { t } = useLanguage()

  return (
    <div className="block-27">
      <nav className="pagination" aria-label={t('pagination.label')}>
        <button
          type="button"
          className={`page-control previous_page${page <= 1 ? ' disabled' : ''}`}
          aria-label={t('pagination.previousAria')}
          disabled={page <= 1}
          onClick={() => onChange?.(page - 1)}
        >
          {t('pagination.previous')}
        </button>

        {pages.map((n) =>
          n === page ? (
            <em
              key={n}
              className="current"
              aria-label={t('pagination.page', { n })}
              aria-current="page"
            >
              {n}
            </em>
          ) : (
            <button
              key={n}
              type="button"
              aria-label={t('pagination.page', { n })}
              onClick={() => onChange?.(n)}
            >
              {n}
            </button>
          ),
        )}

        <button
          type="button"
          className={`page-control next_page${page >= totalPages ? ' disabled' : ''}`}
          aria-label={t('pagination.nextAria')}
          disabled={page >= totalPages}
          onClick={() => onChange?.(page + 1)}
        >
          {t('pagination.next')}
        </button>
      </nav>
    </div>
  )
}
