import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { addBranchThunk, setDocumentTreeThunk } from '../store/reducer.js'
import { selectRootDocuments } from '../store/selector.js'
import useSelector from '../service/useSelector.js'
import DocumentBranchComponent from './Branch.component.js'
import { hashRouter } from '../router/hashRouter.js'

export default class DocumentTreeComponent extends Component {
  template() {
    return `
    <a class="home-logo">홈</a>
    <div class="tree-container"/>
    </ul>
    <button class="add-branch-button">+</button>
    `
  }

  created() {
    store.subscribe(this.render.bind(this))
    store.dispatch(setDocumentTreeThunk())
  }

  render() {
    this.$target.innerHTML = this.template()
    const rootDocuments = useSelector(selectRootDocuments)
    const $treeContainer = document.querySelector('.tree-container')

    rootDocuments.forEach((documentInfo) => {
      const $documentBranchUl = document.createElement('ul')
      $documentBranchUl.classList.add('branch-list')
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
    this.setEvent('click', '#addRootDocumentButton', () =>
      store.dispatch(addBranchThunk({ title: '제목없음', parentId: null }))
    )

    this.setEvent('click', '.home-logo', () => {
      hashRouter.navigate('/')
    })
  }
}
