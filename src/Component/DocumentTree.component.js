import { postDocumentBranch } from '../apis/documentTree.api.js'
import Component from '../core/Component.js'
import { DocumentTreeBranch } from '../domain/index.js'
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
  }

  render() {
    this.$target.innerHTML = this.template()
    const documentTree = documentTreeStore.getState('documents')
    console.log(documentTree)
    const $rootUl = this.$target.querySelector('.rootUl')
    documentTree.forEach((doc) => {
      this.createDocumentBranch({
        $target: $rootUl,
        doc,
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
