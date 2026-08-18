import style from './Table.module.scss';
import type { TableProps } from '@/types/Table';
 
export const Table = <T,>({ items, columns, getRowKey, onRowClick }: TableProps<T>) => {
  const gridStyle = { gridTemplateColumns: `repeat(${columns.length}, 1fr)` };
  return (
    <div className={style.table}>
      <div className={style.headerRow} style={gridStyle}>
        {columns.map((column) => (
          <div key={column.key} className={style.headerCell}>
            {column.title}
          </div>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={getRowKey(item)}
          className={style.row}
          style={gridStyle}
          onClick={() => onRowClick?.(item)}
        >
          {columns.map((column) => (
            <div key={column.key} className={style.cell}>
              {column.render(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}