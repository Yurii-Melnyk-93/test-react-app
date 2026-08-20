import { describe, expect, it } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats an iso date as day, short month and year', () => {
    expect(formatDate('2024-03-11T12:00:00.000Z')).toBe('11 Mar 2024')
  })

  it('returns an em dash for an unparsable value', () => {
    expect(formatDate('not a date')).toBe('—')
    expect(formatDate('')).toBe('—')
  })
})
