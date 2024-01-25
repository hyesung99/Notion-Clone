import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { addBranchThunk, getDocumentTreeThunk } from '../store/reducer.js'
import { selectDocumentTree } from '../store/selector.js'
import useSelector from '../service/useSelector.js'
import DocumentBranch from './DocumentBranch.js'
import { hashRouter } from '../router/hashRouter.js'
import HomeLogo from './common/HomeLogo.js'

export default class DocumentTree extends Component {
  template() {
    return `
    <div class="home-logo-container"></div>
    <div class="tree-container"></div>
    <button class="add-branch-button root-branch-button">+</button>
    `
  }

  created() {
    store.subscribe(this.render.bind(this))
    store.dispatch(getDocumentTreeThunk())
  }

  render() {
    this.$target.innerHTML = this.template()

    const {
      loading,
      data: documentTree,
      error,
    } = useSelector(selectDocumentTree)

    if (loading || error) return

    const $treeContainer = document.querySelector('.tree-container')
    const $homeLogoContainer = document.querySelector('.home-logo-container')

    this.createChildComponent({
      component: HomeLogo,
      componentOptions: {
        $target: $homeLogoContainer,
      },
    })

    documentTree.forEach((documentInfo) => {
      const $documentBranchUl = document.createElement('ul')
      $documentBranchUl.classList.add('branch-list')
      $documentBranchUl.classList.add('root-branch-list')
      $treeContainer.appendChild($documentBranchUl)
      this.createChildComponent({
        component: DocumentBranch,
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
  }
}
