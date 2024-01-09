export const applyDebounce = (callback, delay) => {
  let debounceTimer
  return (...args) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      callback(args)
    }, delay)
  }
}
