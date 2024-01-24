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
    this.$target.innerHTML = this.template()
  }

  mounted() {
    const { id } = this.props.documentInfo
    this.setEvent('click', '.add-branch-button', () => {
      store.dispatch(addBranchThunk({ title: '제목없음', parentId: id }))
    })
    this.setEvent('click', '.delete-branch-button', () => {
      store.dispatch(deleteBranchThunk({ id }))
    })
  }
}
