import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import useSelector from '../service/useSelector.js'
import { putDocumentTitleThunk } from '../store/reducer.js'
import { selectDetailTitle } from '../store/selector.js'
import { getDetailId } from '../service/getDetailId.js'

export default class Title extends Component {
  template() {
    const id = getDetailId()
    const { title } = useSelector(selectDetailTitle, id)
    console.log(title)
    return `
      <input class="detail-title" value=${title || '제목없음'}>
    `
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
  }
}
