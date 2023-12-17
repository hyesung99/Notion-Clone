class FetchClient {
  baseURL
  baseOption

  constructor({ baseURL, baseOption }) {
    this.baseURL = baseURL
    this.baseOption = baseOption
  }

  async get(url, option = {}) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...this.baseOption,
      ...option,
      method: 'GET',
    })

    return response.json()
  }

  async post(url, data, option = {}) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...this.baseOption,
      ...option,
      method: 'POST',
      body: JSON.stringify(data),
    })

    return JSON.parse(response)
  }

  async put(url, data, option = {}) {
    const response = fetch(`${this.baseURL}${url}`, {
      ...this.baseOption,
      ...option,
      method: 'PUT',
      body: JSON.stringify(data),
    })

    return JSON.parse(response)
  }

  async delete(url, option = {}) {
    const response = fetch(`${this.baseURL}${url}`, {
      ...this.baseOption,
      ...option,
      method: 'DELETE',
    })

    return JSON.parse(response)
  }
}

export default FetchClient
