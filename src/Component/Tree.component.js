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
    <ul class="root-branches">
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
    const $rootBranch = this.$target.querySelector('.root-branches')
    const rootDocuments = useSelector(selectRootDocuments)

    rootDocuments.forEach((documentInfo) => {
      const $documentBranchLi = document.createElement('li')
      $documentBranchLi.classList.add('branch-item')
      $rootBranch.appendChild($documentBranchLi)
      this.createChildComponent({
        component: DocumentBranchComponent,
        componentOptions: {
          $target: $documentBranchLi,
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
