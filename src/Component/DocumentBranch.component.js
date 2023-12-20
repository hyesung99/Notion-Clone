import Component from '../core/Component.js'
import { hashRouter } from '../router/hashRouter.js'
import { documentTreeStore } from '../store/documentTree.store.js'

export default class DocumentBranchComponent extends Component {
  template() {
    const { title, id } = this.state
    return `
    <div class='documentBranchContainer'>
      <a class="documentLink">${title}</a>
      <span class="documentTreeButtonContainer">
      <button class="addDocumentButton" data-id="${id}">+</button>
      <button class="deleteDocumentButton" data-id="${id}">x</button>
      </span>
    </div>
    `
  }

  created() {
    documentTreeStore.subscribe(this.render.bind(this))
  }

  render() {
    const { id: branchId, documents } = this.state
    const $branchContainer = document.createElement('li')
    $branchContainer.classList.add('documentLi')
    $branchContainer.id = branchId
    $branchContainer.innerHTML = this.template()
    this.$target.appendChild($branchContainer)

    documents.forEach((doc) => {
      new DocumentBranchComponent({
        $target: $branchContainer,
        initialState: doc,
      })
    })
  }

  mounted() {
    const { id } = this.state
    const addDocument = documentTreeStore.getState('addDocument')
    const deleteDocument = documentTreeStore.getState('deleteDocument')

    this.setEvent('click', '.documentLink', () => hashRouter.navigate(id))
    this.setEvent('click', '.addDocumentButton', async () =>
      addDocument({ title: '제목없음', parentId: id })
    )
    this.setEvent('click', '.deleteDocumentButton', async () => {
      deleteDocument({ id })
    })
  }
}
