import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { addBranchThunk, setDocumentTreeThunk } from '../store/reducer.js'
import { selectRootDocuments } from '../store/selector.js'
import useSelector from '../service/useSelector.js'
import DocumentBranchComponent from './DocumentBranch.component.js'

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
    const rootDocuments = useSelector(selectRootDocuments)

    rootDocuments.forEach((documentInfo) => {
      const $documentBranchLi = document.createElement('li')
      $documentBranchLi.classList.add('documentLi')
      $rootUl.appendChild($documentBranchLi)
      this.createChildComponent({
        component: DocumentBranchComponent,
        componentOptions: {
          $target: $documentBranchLi,
          initialState: { isOpen: false, documentInfo },
        },
      })
    })
  }

  mounted() {
    this.setEvent('click', '#addRootDocumentButton', () =>
      store.dispatch(addBranchThunk({ title: '제목없음', parentId: null }))
    )
  }
}
