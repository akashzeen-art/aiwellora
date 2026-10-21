import CategoryListingPage from './CategoryListingPage'
import { healthCategories } from '../data/categories'

export default function HealthPage() {
  return <CategoryListingPage titleKey="pages.health" items={healthCategories} />
}
