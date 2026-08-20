import { useEffect, useState } from 'react'

/**
 * Returns `value` only after it has stopped changing for `delay` ms — used to
 * keep the search input responsive while the list filters less often.
 */
export const useDebouncedValue = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}
