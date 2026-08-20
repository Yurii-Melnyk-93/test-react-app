import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from './debounce'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('debounce', () => {
  it('does not call the function before the delay has elapsed', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)

    debounced()
    vi.advanceTimersByTime(299)

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('collapses a burst of calls into the last one', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)

    debounced('a')
    vi.advanceTimersByTime(100)
    debounced('b')
    vi.advanceTimersByTime(100)
    debounced('c')
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
  })

  it('runs again after the previous call settled', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)

    debounced('first')
    vi.advanceTimersByTime(300)
    debounced('second')
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('second')
  })
})
