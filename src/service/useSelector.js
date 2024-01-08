import { store } from '../core/createStore.js'

const useSelector = (selector, ...payload) => {
  const resultSelector = selector(store.getState(), ...payload)
  return resultSelector()
}

export default useSelector
