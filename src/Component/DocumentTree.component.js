import Component from '../core/Component.js'
import { DocumentTreeBranch } from '../domain/index.js'
import { DocumentTreeBranchComponent } from './index.js'

export default class DocumentTreeComponent extends Component {
  template() {
    return `
    <ul class="rootUl">
    </ul>
    <button class="addRootDocumentButton addDocumentButton">+</button>
    `
  }

  render() {
    this.$target.innerHTML = this.template()
    const { documentTree } = this.state
    const $rootUl = this.$target.querySelector('.rootUl')
    documentTree.forEach((doc) => {
      this.createDocumentBranch({
        $target: $rootUl,
        doc,
      })
    })
  }

  createDocumentBranch({ $target, doc }) {
    this.createChildComponent({
      component: DocumentTreeBranchComponent,
      componentOptions: {
        $target,
        initialState: doc,
      },
    })

    if (doc.documents.length > 0) {
      const $ul = document.createElement('ul')
      $target.appendChild($ul)
      doc.documents.forEach((childDoc) => {
        this.createDocumentBranch({ $target: $ul, doc: childDoc })
      })
    }
  }
}
