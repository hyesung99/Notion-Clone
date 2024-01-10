import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from '../storage/storage.js'
import { hashRouter } from '../router/hashRouter.js'
import { DOCUMENT_KEY } from '../constants/api.js'

export const saveDocumentToStorage = ({ title, content }) => {
  setStorageItem(DOCUMENT_KEY + hashRouter.url, {
    title,
    content,
    tmpSaveDate: new Date().toString(),
  })
}

export const removeDocumentFromStorage = (documentId) => {
  removeStorageItem(DOCUMENT_KEY + documentId)
}

export const getDocumentFromStorage = (documentId) => {
  return getStorageItem(DOCUMENT_KEY + documentId, {})
}
