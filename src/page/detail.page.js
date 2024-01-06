import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { getDetailId } from '../service/getDetailId.js'
import useSelector from '../service/useSelector.js'
import {
  putDocumentTitleThunk,
  setDocumentDetailThunk,
} from '../store/reducer.js'
import { selectDocumentDetail } from '../store/selector.js'
import DetailTitleComponent from '../component/DetailTitle.component.js'

export default class DetailPage extends Component {
  template() {
    // const { title, content } = useSelector(selectDocumentDetail)
    return `
      <div class="detail-page">
        <section class="detail-header"/>
        <section class="detail-body"/>
      </div>
    `
  }

  created() {
    const id = getDetailId()
    store.dispatch(setDocumentDetailThunk({ id }))
  }

  render() {
    this.$target.innerHTML = this.template()
    const id = getDetailId()
    const { title, content } = useSelector(selectDocumentDetail)

    this.createChildComponent({
      component: DetailTitleComponent,
      componentOptions: {
        $target: document.querySelector('.detail-header'),
        props: { title, id },
      },
    })
  }

  // mounted() {
  //   this.setEvent('change', '.detail-title', (event) => {
  //     store.dispatch(
  //       putDocumentTitleThunk({
  //         title: event.target.value,
  //         id: getDetailId(),
  //       })
  //     )
  //   })
  // }
}
