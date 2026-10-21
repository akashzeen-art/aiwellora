import CategoryListingPage from './CategoryListingPage'
import { relaxationCategories } from '../data/categories'

export default function RelaxationPage() {
  return (
    <CategoryListingPage titleKey="pages.relaxation" items={relaxationCategories} />
  )
}
