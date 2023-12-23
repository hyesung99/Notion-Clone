import Component from '../core/Component.js'
import { hashRouter } from '../router/hashRouter.js'
import { documentTreeStore } from '../store/documentTree.store.js'
import DocumentEmptyBranch from './DocumentEmptyBranch.component.js'

export default class DocumentBranchComponent extends Component {
  template() {
    const { documentInfo } = this.state
    return `
      <div class='documentBranchContainer'>
        <button class="documentOpenButton">▶</button>
        <a class="documentLink">${documentInfo.title}</a>
        <span class="documentTreeButtonContainer">
          <button class="addDocumentButton">+</button>
          <button class="deleteDocumentButton">x</button>
        </span>
      </div>
      <li class='documentLi branch-of-${documentInfo.id}'></li>
    `
  }

  created() {
    documentTreeStore.subscribe(this.render.bind(this))
  }

  render() {
    const { documentInfo, isOpen } = this.state
    this.$target.innerHTML = this.template()
    const $documentBranchLi = document.querySelector(
      `.branch-of-${documentInfo.id}`
    )

    if (!isOpen) return

    if (documentInfo.documents.length === 0) {
      new DocumentEmptyBranch({
        $target: $documentBranchLi,
      })
    } else {
      documentInfo.documents.forEach((documentInfo) => {
        new DocumentBranchComponent({
          $target: $documentBranchLi,
          initialState: { isOpen: false, documentInfo },
        })
      })
    }
  }

  mounted() {
    const { id } = this.state.documentInfo
    const addDocument = documentTreeStore.getState('addDocument')
    const deleteDocument = documentTreeStore.getState('deleteDocument')

    this.setEvent('click', '.documentLink', () => hashRouter.navigate(id))
    this.setEvent('click', '.addDocumentButton', async () =>
      addDocument({ title: '제목없음', parentId: id })
    )
    this.setEvent('click', '.deleteDocumentButton', async () => {
      deleteDocument({ id })
    })
    this.setEvent('click', '.documentOpenButton', () => {
      this.setState(
        Object.assign(this.state, {
          isOpen: !this.state.isOpen,
        })
      )
    })
  }
}
