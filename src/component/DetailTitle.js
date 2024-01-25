import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import useSelector from '../service/useSelector.js'
import { setBranchTitle, putDocumentTitleThunk } from '../store/reducer.js'
import { selectDetailTitle } from '../store/selector.js'
import { getDetailId } from '../service/getDetailId.js'

export default class DetailTitle extends Component {
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

  render() {
    this.$target.innerHTML = this.template()
  }

  mounted() {
    this.setEvent('focusout', '.detail-title', (event) => {
      store.dispatch(
        setBranchTitle({
          title: event.target.value,
          id: getDetailId(),
        })
      )
      store.dispatch(
        putDocumentTitleThunk({
          title: event.target.value,
          id: getDetailId(),
        })
      )
    })
  }
}
