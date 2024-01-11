const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

export const getStorageItem = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : defaultValue
}

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorageItem = (key) => {
  localStorage.removeItem(key)
}

export const getSessionItem = (key, defaultValue) => {
  const storedValue = sessionStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : defaultValue
}

export const setSessionItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const removeSessionItem = (key) => {
  sessionStorage.removeItem(key)
}
