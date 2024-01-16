import { getDocumentDetail, putDocument } from '../apis/document.api.js'
import { STORAGE_KEYS } from '../constants/storage.js'
import { getStorageItem, removeStorageItem } from '../storage/storage.js'

export const getRecentContent = async ({ id }) => {
  const storageContent = getStorageItem(STORAGE_KEYS.CONTENT(id))
  const serverDetail = await getDocumentDetail({ id })
  if (!storageContent) {
    return serverDetail.content
  }

  const storageDate = new Date(storageContent.updateAt)
  const serverDate = new Date(serverDetail.updateAt)
  if (storageDate > serverDate) {
    const confirmed = confirm('저장된 내용이 있습니다. 불러오시겠습니까?')

    if (confirmed) {
      putDocument({ id, content: storageContent.content })
      removeStorageItem(STORAGE_KEYS.CONTENT(id))
      return storageContent.content
    }
  }
  removeStorageItem(STORAGE_KEYS.CONTENT(id))
  return serverDetail.content
}
