/** Delays `fn` until `delay` ms have passed without another call. */
export const debounce = <TArgs extends unknown[]>(fn: (...args: TArgs) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: TArgs) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
