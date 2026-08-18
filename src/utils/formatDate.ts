const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

/** Formats an ISO date string; returns an em dash if it cannot be parsed. */
export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate)

  return Number.isNaN(date.getTime()) ? '—' : formatter.format(date)
}
