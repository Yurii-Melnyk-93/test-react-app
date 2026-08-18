export const SORT_OPTIONS = ['newest', 'oldest', 'name'] as const

export type SortOption = (typeof SORT_OPTIONS)[number]

export const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  name: 'Name (A–Z)',
}

export const STATUS_FILTER_ALL = 'all'
