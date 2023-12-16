class FetchClient {
  baseURL
  baseOption

  constructor({ baseURL, baseOption }) {
    this.baseURL = baseURL
    this.baseOption = baseOption
  }

  async get(url, option = {}) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ..._BASE_OPTION,
      ...option,
      method: 'GET',
    })

    return JSON.parse(response)
  }

  async post(url, data, option = {}) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ..._BASE_OPTION,
      ...option,
      method: 'POST',
      body: JSON.stringify(data),
    })

    return JSON.parse(response)
  }

  async put(url, data, option = {}) {
    const response = fetch(`${this.baseURL}${url}`, {
      ..._BASE_OPTION,
      ...option,
      method: 'PUT',
      body: JSON.stringify(data),
    })

    return JSON.parse(response)
  }

  delete(url, option = {}) {
    const response = fetch(`${this.baseURL}${url}`, {
      ..._BASE_OPTION,
      ...option,
      method: 'DELETE',
    })

    return JSON.parse(response)
  }
}
