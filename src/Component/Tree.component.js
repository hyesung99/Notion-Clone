import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { addBranchThunk, setDocumentTreeThunk } from '../store/reducer.js'
import { selectDocumentTree } from '../store/selector.js'
import useSelector from '../service/useSelector.js'
import DocumentBranchComponent from './Branch.component.js'
import { hashRouter } from '../router/hashRouter.js'

export default class DocumentTreeComponent extends Component {
  template() {
    return `
    <a class="home-logo">홈</a>
    <div class="tree-container"></div>
    <button class="add-branch-button root-branch-button">+</button>
    `
  }

  created() {
    store.subscribe(this.render.bind(this))
    store.dispatch(setDocumentTreeThunk())
  }

  render() {
    this.$target.innerHTML = this.template()

    const { loading, data: documentTree } = useSelector(selectDocumentTree)
    const $treeContainer = document.querySelector('.tree-container')

    if (loading) return

    documentTree.forEach((documentInfo) => {
      const $documentBranchUl = document.createElement('ul')
      $documentBranchUl.classList.add('branch-list')
      $documentBranchUl.classList.add('root-branch-list')
      $treeContainer.appendChild($documentBranchUl)
      this.createChildComponent({
        component: DocumentBranchComponent,
        componentOptions: {
          $target: $documentBranchUl,
          props: { documentInfo },
        },
      })
    })
  }

  mounted() {
    this.setEvent('click', '.root-branch-button', () =>
      store.dispatch(addBranchThunk({ title: '제목없음', parentId: null }))
    )
    this.setEvent('click', '.home-logo', () => {
      hashRouter.navigate('')
    })
  }
}
