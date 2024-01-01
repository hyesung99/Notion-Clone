import { store } from '../core/createStore.js'

const useSelector = (selector) => {
  const result = selector(store.getState())()
  return result
}

export default useSelector
