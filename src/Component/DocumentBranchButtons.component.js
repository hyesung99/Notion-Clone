import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { addBranchThunk, deleteBranchThunk } from '../core/reducer.js'

export default class DocumentBranchButtons extends Component {
  template() {
    return `
      <span class="documentTreeButtonContainer">
        <button class="addDocumentButton">+</button>
        <button class="deleteDocumentButton">x</button>
      </span>
    `
  }

  mounted() {
    const { id } = this.state.documentInfo
    this.setEvent('click', '.addDocumentButton', () => {
      store.dispatch(addBranchThunk({ title: '제목없음', parentId: id }))
    })
    this.setEvent('click', '.deleteDocumentButton', () => {
      store.dispatch(deleteBranchThunk({ id }))
    })
  }
}
