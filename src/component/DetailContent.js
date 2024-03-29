import Component from '../core/Component.js'
import TextArea from './common/TextArea.js'
import DetailContentSkeleton from './skeletons/DetailContentSkeleton.js'
import useSelector from '../service/useSelector.js'
import { putDocument } from '../apis/document.api.js'
import { STORAGE_KEYS } from '../constants/storage.js'
import { store } from '../core/createStore.js'
import { getDetailId } from '../service/getDetailId.js'
import { setStorageItem } from '../storage/storage.js'
import { getDocumentContentThunk } from '../store/reducer.js'
import { selectDetailContent } from '../store/selector.js'
import { applyDebounce } from '../utils/applyDebounce.js'
import { hashRouter } from '../router/hashRouter.js'

export default class DetailContent extends Component {
  created() {
    store.subscribe(this.render.bind(this))
    store.dispatch(getDocumentContentThunk({ id: getDetailId() }))
  }

  async render() {
    const STORAGE_DEBOUNCE_DELAY = 300
    const SERVER_DEBOUNCE_DELAY = 1000

    const { data: content, loading, error } = useSelector(selectDetailContent)

    if (loading) {
      this.createChildComponent({
        component: DetailContentSkeleton,
        componentOptions: {
          $target: this.$target,
        },
      })
      return
    }

    if (error) {
      hashRouter.navigate('/error')
      return
    }

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

  saveContentToStorage(event) {
    const id = getDetailId()
    const content = event[0].target.innerText
    const updateAt = new Date()
    setStorageItem(STORAGE_KEYS.CONTENT(id), { content, updateAt })
  }

  async saveContentToServer(event) {
    const id = getDetailId()
    const content = event[0].target.innerHTML
    await putDocument({ id, content })
  }
}
