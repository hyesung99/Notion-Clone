export function createStore(initialState = {}) {
  let state = initialState
  const listeners = []

  const setState = (nextState) => {
    if (nextState !== state) {
      state = Object.assign({}, state, nextState)
      notify()
    }
  }

  const notify = () => {
    listeners.forEach((listener) => listener())
  }

  const getState = (selector) => {
    return selector ? state[selector] : state
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => listeners.delete(listener)
  }

  return {
    setState,
    getState,
    subscribe,
  }
}
