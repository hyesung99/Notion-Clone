import { rootReducer } from './reducer.js'

export function createStore(reducer) {
  let state
  const listeners = []

  const dispatch = (action) => {
    //thunk 처리
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    state = reducer(state, action)
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

  dispatch(state, {})

  return {
    dispatch,
    getState,
    subscribe,
  }
}

export const store = createStore(rootReducer)
