export function createStore(initialState = {}) {
  let state = initialState
  let listeners = []

  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial
    if (nextState !== state) {
      state = replace ? nextState : Object.assign({}, state, nextState)
      listeners.forEach((listener) => listener(state))
    }
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
