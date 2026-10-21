const IMG = '/health/images'
const LIFESTYLE_IMG = '/lifestyle'

export const lifestyleCategories = [
  { id: 90, nameKey: 'acts_of_service', image: `${LIFESTYLE_IMG}/acts_of_service.jpg` },
  { id: 13, nameKey: 'lifestyle_boundaries', image: `${LIFESTYLE_IMG}/lifestyle_boundaries.jpg` },
  { id: 25, nameKey: 'magnify', image: `${LIFESTYLE_IMG}/magnify.jpg` },
  { id: 86, nameKey: 'gifting', image: `${LIFESTYLE_IMG}/gifting.jpg` },
  { id: 84, nameKey: 'gratitude', image: `${LIFESTYLE_IMG}/gratitude.jpg` },
  { id: 92, nameKey: 'identity', image: `${LIFESTYLE_IMG}/identity.jpg` },
  { id: 94, nameKey: 'life_transitions', image: `${LIFESTYLE_IMG}/life_transitions.jpg` },
  { id: 29, nameKey: 'mindfulness', image: `${LIFESTYLE_IMG}/mindfulness.jpg` },
  { id: 5, nameKey: 'positive_thinking', image: `${LIFESTYLE_IMG}/positive_thinking.jpg` },
  { id: 15, nameKey: 'lifestyle_morning_routine', image: `${LIFESTYLE_IMG}/lifestyle_morning_routine.jpg` },
  { id: 28, nameKey: 'salt', image: `${LIFESTYLE_IMG}/salt.jpg` },
  { id: 26, nameKey: 'sugar', image: `${LIFESTYLE_IMG}/sugar.jpg` },
  { id: 88, nameKey: 'time_management', image: `${LIFESTYLE_IMG}/time_management.jpg` },
  { id: 82, nameKey: 'volunteering', image: `${LIFESTYLE_IMG}/volunteering.jpg` },
  { id: 27, nameKey: 'water', image: `${LIFESTYLE_IMG}/water.jpg` },
]

export const healthCategories = [
  { id: 108, nameKey: 'alcoholism', image: `${IMG}/alcoholism.jpg` },
  { id: 35, nameKey: 'angry', image: `${IMG}/angry.jpg` },
  { id: 21, nameKey: 'health_burnout', image: `${IMG}/health_burnout.jpg` },
  { id: 33, nameKey: 'community', image: `${IMG}/community.jpg` },
  { id: 3, nameKey: 'depression', image: `${IMG}/depression.jpg` },
  { id: 106, nameKey: 'divorce', image: `${IMG}/divorce.jpg` },
  { id: 39, nameKey: 'fatigue', image: `${IMG}/fatigue.jpg` },
  { id: 2, nameKey: 'grief', image: `${IMG}/grief.jpg` },
  { id: 31, nameKey: 'insomnia', image: `${IMG}/insomnia.jpg` },
  { id: 23, nameKey: 'health_loneliness', image: `${IMG}/health_loneliness.jpg` },
  { id: 36, nameKey: 'nutrition', image: `${IMG}/nutrition.jpg` },
  { id: 34, nameKey: 'ocd', image: `${IMG}/ocd.jpg` },
  { id: 37, nameKey: 'overeating', image: `${IMG}/overeating.jpg` },
  { id: 32, nameKey: 'panic_attacks', image: `${IMG}/panic_attacks.jpg` },
  { id: 100, nameKey: 'paranoia', image: `${IMG}/paranoia.jpg` },
  { id: 38, nameKey: 'peer_pressure', image: `${IMG}/peer_pressure.jpg` },
  { id: 42, nameKey: 'pet_therapy', image: `${IMG}/pet_therapy.jpg` },
  { id: 104, nameKey: 'secrets', image: `${IMG}/secrets.jpg` },
  { id: 102, nameKey: 'social_anxiety', image: `${IMG}/social_anxiety.jpg` },
  { id: 30, nameKey: 'social_media', image: `${IMG}/social_media.jpg` },
  { id: 40, nameKey: 'sports', image: `${IMG}/sports.jpg` },
  { id: 1, nameKey: 'stress', image: `${IMG}/stress.jpg` },
  { id: 98, nameKey: 'strife', image: `${IMG}/strife.jpg` },
  { id: 96, nameKey: 'unforgiveness', image: `${IMG}/unforgiveness.jpg` },
  { id: 4, nameKey: 'walking', image: `${IMG}/walking.jpg` },
]

export const relaxationCategories = [
  { id: 71, nameKey: 'art_therapy', image: `${IMG}/art_therapy.jpg` },
  { id: 45, nameKey: 'baking', image: `${IMG}/baking.jpg` },
  { id: 41, nameKey: 'warm_bath', image: `${IMG}/warm_bath.jpg` },
  { id: 19, nameKey: 'relaxation_taking_breaks', image: `${IMG}/relaxation_taking_breaks.jpg` },
  { id: 44, nameKey: 'cooking', image: `${IMG}/cooking.jpg` },
  { id: 48, nameKey: 'digital_detox', image: `${IMG}/digital_detox.jpg` },
  { id: 49, nameKey: 'dining', image: `${IMG}/dining.jpg` },
  { id: 47, nameKey: 'gardening', image: `${IMG}/gardening.jpg` },
  { id: 76, nameKey: 'herbal_tea', image: `${IMG}/herbal_tea.jpg` },
  { id: 17, nameKey: 'relaxation_massage_therapy', image: `${IMG}/relaxation_massage_therapy.jpg` },
  { id: 6, nameKey: 'nature_walks', image: `${IMG}/nature_walks.jpg` },
  { id: 80, nameKey: 'photography', image: `${IMG}/photography.jpg` },
  { id: 43, nameKey: 'calming_sounds', image: `${IMG}/calming_sounds.jpg` },
  { id: 46, nameKey: 'television', image: `${IMG}/television.jpg` },
]

/** @deprecated use lifestyleCategories */
export const categories = lifestyleCategories

export const allGuides = [
  ...lifestyleCategories.map((c) => ({ ...c, sectionPath: '/lifestyle' })),
  ...healthCategories.map((c) => ({ ...c, sectionPath: '/health' })),
  ...relaxationCategories.map((c) => ({ ...c, sectionPath: '/relaxation' })),
]

export function findGuideById(id) {
  const num = Number(id)
  return allGuides.find((g) => g.id === num) || null
}

export const navLinks = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.health', to: '/health' },
  { labelKey: 'nav.relaxation', to: '/relaxation' },
  { labelKey: 'nav.lifestyle', to: '/lifestyle' },
  { labelKey: 'nav.logout', href: '#' },
]
