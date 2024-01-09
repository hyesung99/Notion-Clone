import { getDocumentDetail, putDocument } from '../apis/document.api.js'
import { STORAGE_KEYS } from '../constants/storage.js'
import Component from '../core/Component.js'
import { getDetailId } from '../service/getDetailId.js'
import TextArea from './TextArea.component.js'

export default class DetailContent extends Component {
  async render() {
    const recentContent = await this.getRecentContent()
    this.createChildComponent({
      component: TextArea,
      componentOptions: {
        $target: this.$target,
        props: {
          content: recentContent,
          onKeyUp: this.saveContentToStorage,
          onBlur: this.saveContentToServer,
        },
      },
    })
  }

  async getRecentContent() {
    const id = getDetailId()
    const storageContent = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CONTENT(id))
    )
    console.log(storageContent)
    const serverDetail = await getDocumentDetail({ id })

    if (!storageContent) return serverDetail.content

    // console.log(storageContent.createdAt, serverDetail.createdAt)
    const storageDate = new Date(storageContent.createdAt)
    const serverDate = new Date(serverDetail.createdAt)
    if (storageDate > serverDate) {
      const confirmed = confirm('저장된 내용이 있습니다. 불러오시겠습니까?')
      return confirmed ? storageContent.content : serverDetail.content
    }

    localStorage.removeItem(STORAGE_KEYS.DETAIL)

    return serverDetail.content
  }

  saveContentToStorage(event) {
    const id = getDetailId()

    const content = event.target.innerText
    const createdAt = new Date()

    localStorage.setItem(
      STORAGE_KEYS.CONTENT(id),
      JSON.stringify({ id, content, createdAt })
    )
  }

  async saveContentToServer(event) {
    const id = getDetailId()
    const content = event.target.innerText
    console.log('blur')
    await putDocument({ id, content })
  }
}
