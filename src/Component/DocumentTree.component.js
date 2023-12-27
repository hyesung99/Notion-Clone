import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { addBranchThunk, setDocumentTreeThunk } from '../core/reducer.js'
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
    store.subscribe(this.render.bind(this))
    store.dispatch(setDocumentTreeThunk())
  }

  render() {
    this.$target.innerHTML = this.template()
    const $rootUl = this.$target.querySelector('.rootUl')
    const documentTree = store.getState('documentTree')

    documentTree.documents.forEach((documentInfo) => {
      const $documentBranchLi = document.createElement('li')
      $documentBranchLi.classList.add('documentLi')
      $rootUl.appendChild($documentBranchLi)
      return new DocumentTreeBranchComponent({
        $target: $documentBranchLi,
        initialState: { isOpen: false, documentInfo },
      })
    })
  }

  mounted() {
    this.setEvent('click', '#addRootDocumentButton', () =>
      store.dispatch(addBranchThunk({ title: '제목없음', parentId: null }))
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
