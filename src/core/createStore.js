import { rootReducer } from '../store/reducer.js'

export const createStore = (reducer) => {
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
  }

  const unsubscribe = (listener) => {
    const index = listeners.indexOf(listener)
    listeners.splice(index, 1)
  }

  dispatch(state, {})

  return {
    dispatch,
    getState,
    subscribe,
    unsubscribe,
  }
}

export const store = createStore(rootReducer)
