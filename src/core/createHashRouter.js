import { getSessionItem, setSessionItem } from '../storage/storage.js'

export const createHashRouter = (routes) => {
  const listeners = []

  const navigate = (path) => {
    location.hash = path
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    const lastPath = getSessionItem('lastPath')
    notify(lastPath)
  }

  const notify = () => {
    listeners.forEach((listener) => listener(getMatchedRoute()))
  }

  const getHash = () => {
    return location.hash.replace('#', '')
  }

  const getMatchedRoute = () => {
    const hash = getHash()

    if (!hash) return routes['/']

    const matchedRoute = Object.keys(routes).find((routePattern) => {
      const pattern = new RegExp(`^${routePattern}$`)
      return pattern.test(hash)
    })
    if (!matchedRoute) {
      throw new Error('경로에 맞는 페이지가 없습니다.')
    }
    return routes[matchedRoute]
  }

  window.addEventListener('popstate', () => {
    setSessionItem('lastPath', getHash())
    notify()
  })

  return {
    notify,
    subscribe,
    navigate,
    getHash,
  }
}
