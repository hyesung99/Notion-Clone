import Component from '../core/Component.js'
import { documentTreeStore } from '../store/documentTree.store.js'
import { DocumentTreeBranchComponent } from './index.js'

export default class DocumentTreeComponent extends Component {
  template() {
    return `
    <ul class="rootUl">
    </ul>
    <button id='addRootDocumentButton' class="addDocumentButton">+</button>
    `
  }

  created() {
    documentTreeStore.subscribe(this.render.bind(this))
    this.state = documentTreeStore.getState('documents')
  }

  render() {
    this.$target.innerHTML = this.template()
    const $rootUl = this.$target.querySelector('.rootUl')
    const documentTree = documentTreeStore.getState('documents')

    documentTree.forEach((doc) => {
      const $documentBranchLi = document.createElement('li')
      $documentBranchLi.classList.add('documentLi')
      $rootUl.appendChild($documentBranchLi)
      return new DocumentTreeBranchComponent({
        $target: $documentBranchLi,
        initialState: doc,
      })
    })
  }

  mounted() {
    const addDocument = documentTreeStore.getState('addDocument')
    this.setEvent('click', '#addRootDocumentButton', () =>
      addDocument({
        title: '제목없음',
        parentId: null,
      })
    )
  }

  createDocumentBranch({ $target, doc }) {
    this.createChildComponent({
      component: DocumentTreeBranchComponent,
      componentOptions: {
        $target,
        initialState: doc,
      },
    })

    if (doc.documents && doc.documents.length > 0) {
      const $ul = document.createElement('ul')
      $target.appendChild($ul)
      doc.documents.forEach((childDoc) => {
        this.createDocumentBranch({ $target: $ul, doc: childDoc })
      })
    }
  }
}
