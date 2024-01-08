import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import useSelector from '../service/useSelector.js'
import { setDocumentDetailThunk } from '../store/reducer.js'
import { selectDocumentDetail } from '../store/selector.js'
import { getDetailId } from '../service/getDetailId.js'

export default class Title extends Component {
  template() {
    const { title } = useSelector(selectDocumentDetail)
    return `
      <input class="detail-title" value=${title}>
    `
  }

  created() {
    store.dispatch(setDocumentDetailThunk({ id: getDetailId() }))
    store.subscribe(this.render.bind(this))
  }
}
