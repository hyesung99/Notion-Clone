import { validateDomain } from '../service/domainService.js'

export default class DocumentTree {
  #allowedProperties
  #properties

  constructor(properties) {
    this.#allowedProperties = { documentTree: 'array', isInput: 'boolean' }
    this.#properties = properties
  }

  get documentTree() {
    return this.#properties.documentTree
  }

  get properties() {
    return this.#properties
  }
}
