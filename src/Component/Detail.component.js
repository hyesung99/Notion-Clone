import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { hashRouter } from '../router/hashRouter.js'
import useSelector from '../service/useSelector.js'
import { setDocumentDetailThunk } from '../store/reducer.js'
import { selectDocumentDetail } from '../store/selector.js'
export default class EditorComponent extends Component {
  template() {
    const { title, content } = useSelector(selectDocumentDetail)
    return `
      <div class="editorContainer">
        <div class="title" maxLength="20">
          ${title}
        </div>
        <div class="textarea">
          ${content || '내용을 입력하세요.'}
        </div>
      </div>
      `
  }

  created() {
    const id = hashRouter.getHash()
    store.dispatch(setDocumentDetailThunk({ id }))
  }

  mounted() {}
}
