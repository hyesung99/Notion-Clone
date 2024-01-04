export const createHashRouter = (routes) => {
  const navigate = (path) => {
    location.hash = path
  }

  const notify = (renderer) => {
    renderer(getMatchedRoute())
  }

  const getHash = () => {
    return location.hash.replace('#', '')
  }

  const getMatchedRoute = () => {
    const hash = getHash()
    const matchedRoute = Object.keys(routes).find((routePattern) => {
      const pattern = new RegExp(`^${routePattern}$`)
      return pattern.test(hash)
    })
    console.log(matchedRoute)
    if (!matchedRoute) {
      throw new Error('경로에 맞는 페이지가 없습니다.')
    }
    return matchedRoute
  }

  window.addEventListener('popstate', notify)

  return {
    notify,
    navigate,
    getHash,
  }
}
