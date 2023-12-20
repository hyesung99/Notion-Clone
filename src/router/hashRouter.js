function createHashRouter() {
  const callbacks = []

  function observe(callback) {
    callbacks.push(callback)
  }

  function notify() {
    console.log('notify')
    if (callbacks.length > 0) {
      callbacks.forEach((callback) => callback())
    }
  }
  function navigate(path) {
    history.pushState(null, '', path)
  }

  function getUrl() {
    return location.hash.replace('#', '')
  }

  function init() {
    window.addEventListener('popstate', notify)
  }

  init()

  return {
    observe,
    notify,
    navigate,
    getUrl,
  }
}

export const hashRouter = createHashRouter()
