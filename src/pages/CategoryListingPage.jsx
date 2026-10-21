import { useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import Pagination from '../components/Pagination'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'

const PAGE_SIZE = 12

export default function CategoryListingPage({ titleKey, items }) {
  const [page, setPage] = useState(1)
  const { t, categoryName } = useLanguage()
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const visible = items.slice(start, start + PAGE_SIZE)

  const handlePageChange = (nextPage) => {
    setPage(nextPage)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className="container-fluid listing-page top-0 index5 mx-0 px-0">
        <div className="container-lg mx-0 px-0 px-lg-auto mx-lg-auto">
          <div className="row mx-auto listing-title-row">
            <div className="col-12">
              <div className="title">{t(titleKey)}</div>
            </div>
          </div>

          <div className="row mx-auto p-2 g-3 category-grid-row">
            {visible.map((item) => (
              <div key={item.id} className="col-6 col-lg-3 p-0 my-0">
                <CategoryCard
                  name={categoryName(item.nameKey)}
                  image={item.image}
                  to={`/guide/${item.id}`}
                />
              </div>
            ))}
          </div>

          <div className="row mx-auto listing-pagination">
            <div className="col-12 text-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
