import type { ReactNode } from 'react'

export type Column<T> = {
  key: string
  title: string
  render: (item: T) => ReactNode
}

export type TableProps<T> = {
  items: T[]
  columns: Column<T>[]
  getRowKey: (item: T) => string
  onRowClick?: (item: T) => void
  /** Visually hidden description of the table, read by screen readers. */
  caption?: string
  /** Rendered instead of the table when `items` is empty. */
  emptyState?: ReactNode
}
