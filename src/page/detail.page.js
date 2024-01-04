import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { getDetailId } from '../service/getDetailId.js'
import useSelector from '../service/useSelector.js'
import {
  putDocumentTitleThunk,
  setDocumentDetailThunk,
} from '../store/reducer.js'
import { selectDocumentDetail } from '../store/selector.js'

export default class DetailPage extends Component {
  template() {
    const { title, content } = useSelector(selectDocumentDetail)
    return `
      <div class="detail-page">
        <input class="detail-title" value=${title}/>
        <div class="detail-content">${content || '내용을 입력해주세요'}</div>
      </div>
    `
  }

  created() {
    store.subscribe(this.render.bind(this))
    const id = getDetailId()
    store.dispatch(setDocumentDetailThunk({ id }))
  }

  mounted() {
    this.setEvent('change', '.detail-title', (event) => {
      store.dispatch(
        putDocumentTitleThunk({
          title: event.target.value,
          id: getDetailId(),
        })
      )
    })
  }
}
