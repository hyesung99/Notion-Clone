import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import useSelector from '../service/useSelector.js'
import {
  putDocumentTitleThunk,
  setDocumentDetailThunk,
} from '../store/reducer.js'
import { selectTitle } from '../store/selector.js'
import { getDetailId } from '../service/getDetailId.js'

export default class Title extends Component {
  template() {
    const id = getDetailId()
    const { title } = useSelector(selectTitle, id)
    return `
      <input class="detail-title" value=${title}>
    `
  }

  created() {
    store.dispatch(setDocumentDetailThunk({ id: getDetailId() }))
    store.subscribe(this.render.bind(this))
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
