import { SearchInput } from '@/components/ui'
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS, type ProjectStatus } from '@/types/Project'
import { SORT_LABELS, SORT_OPTIONS, STATUS_FILTER_ALL, type SortOption } from '@/types/Sort'
import styles from './ProjectsToolbar.module.scss'

export type StatusFilter = ProjectStatus | typeof STATUS_FILTER_ALL

type ProjectsToolbarProps = {
  search: string
  status: StatusFilter
  sort: SortOption
  onSearchChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
  onSortChange: (value: SortOption) => void
}

export const ProjectsToolbar = ({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: ProjectsToolbarProps) => (
  <div className={styles.toolbar}>
    <SearchInput
      id="project-search"
      label="Search projects"
      placeholder="Search by name or description"
      value={search}
      onChange={onSearchChange}
    />

    <div className={styles.control}>
      <label htmlFor="status-filter" className={styles.label}>
        Status
      </label>
      <select
        id="status-filter"
        className={styles.select}
        value={status}
        onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
      >
        <option value={STATUS_FILTER_ALL}>All</option>
        {PROJECT_STATUSES.map((projectStatus) => (
          <option key={projectStatus} value={projectStatus}>
            {PROJECT_STATUS_LABELS[projectStatus]}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.control}>
      <label htmlFor="sort-order" className={styles.label}>
        Sort
      </label>
      <select
        id="sort-order"
        className={styles.select}
        value={sort}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </select>
    </div>
  </div>
)
