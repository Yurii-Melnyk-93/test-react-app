import type { ReactNode } from 'react'
import type { TableProps } from '@/types/Table'
import styles from './Table.module.scss'

export const Table = <T,>({
  items,
  columns,
  getRowKey,
  onRowClick,
  caption,
  emptyState,
}: TableProps<T>) => {
  if (items.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  const isInteractive = Boolean(onRowClick)

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={styles.headerCell}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={getRowKey(item)}
              className={isInteractive ? styles.interactiveRow : undefined}
              // A clickable row must also be reachable by keyboard, otherwise
              // the detail page is unreachable without a mouse.
              tabIndex={isInteractive ? 0 : undefined}
              onClick={() => onRowClick?.(item)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onRowClick?.(item)
                }
              }}
            >
              {columns.map((column) => (
                <td key={column.key} className={styles.cell}>
                  {column.render(item) as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
