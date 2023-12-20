export function createStore(initialState = {}) {
  let state = initialState
  let listeners = new Set()

  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial
    if (nextState !== state) {
      state = replace ? nextState : Object.assign({}, state, nextState)
      console.log(listeners)
      listeners.forEach((listener) => listener(state))
    }
  }

  const getState = (selector) => {
    return selector ? state[selector] : state
  }

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return {
    setState,
    getState,
    subscribe,
  }
}
