import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import useSelector from '../service/useSelector.js'
import { putDocumentTitleThunk } from '../store/reducer.js'
import { selectDetailTitle } from '../store/selector.js'
import { getDetailId } from '../service/getDetailId.js'
import { applyDebounce } from '../utils/applyDebounce.js'

export default class Title extends Component {
  template() {
    const id = getDetailId()
    const { title } = useSelector(selectDetailTitle, id)

    return `
      <input type="text" class="detail-title" value="${title || '제목없음'}"/>
    `
  }

  created() {
    store.subscribe(this.render.bind(this))
  }

  mounted() {
    this.setEvent('input', '.detail-title', (event) => {
      store.dispatch(
        putDocumentTitleThunk({
          title: event.target.value,
          id: getDetailId(),
        })
      )
    })

    this.setEvent('focusin', '.detail-title', () =>
      store.unsubscribe(this.render.bind(this))
    )
    this.setEvent('focusout', '.detail-title', () =>
      store.subscribe(this.render.bind(this))
    )
  }
}
