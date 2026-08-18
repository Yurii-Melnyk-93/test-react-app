import { useEffect } from 'react'

/**
 * Calls `callback` when a mousedown happens outside of `ref`.
 * The ref may hold `null` before the element mounts, hence the nullable type.
 */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
