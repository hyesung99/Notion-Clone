export const createHashRouter = () => {
  const listeners = []

  const subscribe = (listener) => {
    listeners.push(listener)
  }

  const notify = () => {
    if (listeners.length > 0) {
      listeners.forEach((listener) => listener())
    }
  }
  const navigate = (path) => {
    location.hash = path
  }

  const getHash = () => {
    return location.hash.replace('#', '')
  }

  window.addEventListener('popstate', notify)

  return {
    subscribe,
    notify,
    navigate,
    getHash,
  }
}
