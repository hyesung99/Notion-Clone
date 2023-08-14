export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

export const request = async (url, options = {}) => {
  const res = await fetch(`${API_END_POINT}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-username': 'sungbird',
    },
  })

  return await res.json()
}
