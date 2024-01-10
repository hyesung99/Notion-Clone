import { getDocumentDetail, putDocument } from '../apis/document.api.js'
import { STORAGE_KEYS } from '../constants/storage.js'
import Component from '../core/Component.js'
import { getDetailId } from '../service/getDetailId.js'

import { getItem, removeItem, setItem } from '../storage/storage.js'
import { applyDebounce } from '../utils/applyDebounce.js'
import TextArea from './TextArea.component.js'

export default class DetailContent extends Component {
  async render() {
    const STORAGE_DEBOUNCE_DELAY = 300
    const SERVER_DEBOUNCE_DELAY = 1000

    const content = await this.getRecentContent()

    this.createChildComponent({
      component: TextArea,
      componentOptions: {
        $target: this.$target,
        props: {
          content,
          onKeyUp: applyDebounce(
            this.saveContentToStorage,
            STORAGE_DEBOUNCE_DELAY
          ),
          onBlur: applyDebounce(
            this.saveContentToServer,
            SERVER_DEBOUNCE_DELAY
          ),
        },
      },
    })
  }

  async getRecentContent() {
    const id = getDetailId()
    const storageContent = getItem(STORAGE_KEYS.CONTENT(id))
    const serverDetail = await getDocumentDetail({ id })

    if (!storageContent) return serverDetail.content

    const storageDate = new Date(storageContent.updateAt)
    const serverDate = new Date(serverDetail.updateAt)
    if (storageDate > serverDate) {
      const confirmed = confirm('저장된 내용이 있습니다. 불러오시겠습니까?')

      if (confirmed) {
        putDocument({ id, content: storageContent.content })
        removeItem(STORAGE_KEYS.CONTENT(id))
        return storageContent.content
      }
    }
    removeItem(STORAGE_KEYS.CONTENT(id))
    return serverDetail.content
  }

  saveContentToStorage(event) {
    const id = getDetailId()
    const content = event[0].target.innerText
    const updateAt = new Date()
    setItem(STORAGE_KEYS.CONTENT(id), { content, updateAt })
  }

  async saveContentToServer(event) {
    const id = getDetailId()
    const content = event[0].target.innerHTML
    await putDocument({ id, content })
  }
}