import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { addBranchThunk, deleteBranchThunk } from '../store/reducer.js'

export default class DocumentBranchButtons extends Component {
  template() {
    return `
      <button class="add-branch-button">+</button>
      <button class="delete-branch-button">x</button>
    `
  }

  render() {
    const { isVisible } = this.props
    this.$target.innerHTML = isVisible ? this.template() : ''
  }

  mounted() {
    const { id } = this.props.documentInfo
    this.setEvent('click', '.addDocumentButton', () => {
      store.dispatch(addBranchThunk({ title: '제목없음', parentId: id }))
    })
    this.setEvent('click', '.deleteDocumentButton', () => {
      store.dispatch(deleteBranchThunk({ id }))
    })
  }
}
