import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { closeBranch, openBranch } from '../store/reducer.js'
import { hashRouter } from '../router/hashRouter.js'
import DocumentBranchButtons from './BranchButtons.js'
import DocumentEmptyBranch from './DocumentEmptyBranch.js'
import useSelector from '../service/useSelector.js'
import { selectOpenedBranches } from '../store/selector.js'

export default class DocumentBranch extends Component {
  template() {
    const { documentInfo } = this.props
    const { id, title } = documentInfo
    return `
      <li class="branch-item" id="branch-${id}">
        <button class="branch-open-button" id="open-button-${id}">▶</button>
        <a class="branch-link" id="branch-link-${id}">${title || '제목없음'}</a>
        <div class="branch-button-container" id="branch-button-${id}"></div>
      </li>
      <ul class="branch-list" id="branch-of-${documentInfo.id}"></ul>
    `
  }

  render() {
    const { documentInfo } = this.props
    // this.$target.innerHTML = this.template()
    this.$target.insertAdjacentHTML('beforeend', this.template())

    const $childBranches = document.querySelector(
      `#branch-of-${documentInfo.id}`
    )
    const $documentBranchButtonContainer = document.querySelector(
      `#branch-button-${documentInfo.id}`
    )

    const { openedBranches } = useSelector(selectOpenedBranches)

    const isOpen = openedBranches.has(documentInfo.id)

    this.createChildComponent({
      component: DocumentBranchButtons,
      componentOptions: {
        $target: $documentBranchButtonContainer,
        props: {
          documentInfo,
        },
      },
    })

    if (!isOpen) return

    if (documentInfo.documents.length === 0) {
      this.createChildComponent({
        component: DocumentEmptyBranch,
        componentOptions: {
          $target: $childBranches,
        },
      })
    } else {
      documentInfo.documents.forEach((documentInfo) => {
        this.createChildComponent({
          component: DocumentBranch,
          componentOptions: {
            $target: $childBranches,
            props: { documentInfo },
          },
        })
      })
    }
  }

  mounted() {
    const { id } = this.props.documentInfo
    const { openedBranches } = useSelector(selectOpenedBranches)
    const isOpen = openedBranches.has(id)

    this.setEvent('click', `#branch-link-${id}`, () =>
      hashRouter.navigate(`/detail/${id}`)
    )

    this.setEvent('click', `#open-button-${id}`, () => {
      if (isOpen) {
        store.dispatch(closeBranch({ id }))
      } else {
        store.dispatch(openBranch({ id }))
      }
    })
  }
}
