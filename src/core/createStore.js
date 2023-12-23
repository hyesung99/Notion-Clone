import { rootReducer } from './reducer'

export function createStore() {
  let state
  const listeners = []

  const dispatch = (action) => {
    state = reducer(action, state)
    notify()
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
    dispatch,
    getState,
    subscribe,
  }
}

export const store = createStore(rootReducer)
