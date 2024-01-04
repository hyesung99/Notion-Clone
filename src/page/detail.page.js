import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { hashRouter } from '../router/hashRouter.js'
import { getDetailId } from '../service/getDetailId.js'
import useSelector from '../service/useSelector.js'
import { putDocumentTitleThunk } from '../store/reducer.js'
import { selectDocumentDetail } from '../store/selector.js'

export default class DetailPage extends Component {
  template() {
    const { title, content } = useSelector(selectDocumentDetail)
    return `
      <div class="detail-page">
        <input class="detail-title">${title}</input>
        <div class="detail-content">${content}</div>
      </div>
    `
  }

  mounted() {
    const id = getDetailId(hashRouter.getHash())
    const $title = this.$target.querySelector('.detail-title')
    this.setEvent('keyup', '.detail-title', (event) => {
      console.log(event.target.value)
      store.dispatch(putDocumentTitleThunk({ title: event.target.value, id }))
    })
  }
}
