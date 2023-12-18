import {
  deleteDocumentBranch,
  postDocumentBranch,
} from '../apis/documentTree.api.js'
import Component from '../core/Component.js'
import { hashRouter } from '../router/hashRouter.js'

export default class DocumentBranchComponent extends Component {
  template() {
    const { title, id } = this.state
    return `
      <span class="documentLiContainer">
        <a class="documentLink">${title}</a>
        <span class="documentTreeButtonContainer">
          <button class="addDocumentButton" data-id="${id}">+</button>
          <button class="deleteDocumentButton" data-id="${id}">x</button>
        </span>
      </span> 
    `
  }

  mounted() {
    const { id } = this.state

    this.setEvent('click', '.documentLink', () => hashRouter.navigate(id))
    this.setEvent('click', '.addDocumentButton', async () => {
      await postDocumentBranch({ title: '제목없음', parentId: id })
    })
    this.setEvent('click', '.deleteDocumentButton', async () => {
      await deleteDocumentBranch({ id })
    })
  }

  render() {
    const $li = document.createElement('li')
    $li.id = this.state.id
    $li.innerHTML = this.template()
    this.$target.appendChild($li)
  }
}
