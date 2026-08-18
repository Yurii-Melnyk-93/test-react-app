export type Column<T> = {
  key: string;
  title: string;
  render: (value: T) => React.ReactNode;
}

export type TableProps<T> = {
  items: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => string;
  onRowClick?: (item: T) => void;
}