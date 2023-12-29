import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { closeBranch, openBranch } from '../core/reducer.js'
import { hashRouter } from '../router/hashRouter.js'
import DocumentBranchButtons from './DocumentBranchButtons.component.js'
import DocumentEmptyBranch from './DocumentEmptyBranch.component.js'

export default class DocumentBranchComponent extends Component {
  template() {
    const { documentInfo } = this.state
    return `
      <div class='documentBranchContainer'>
        <button class="documentOpenButton">▶</button>
        <a class="documentLink">${documentInfo.title}</a>
      </div>
      <li class='documentLi branch-of-${documentInfo.id}'></li>
    `
  }

  created() {
    store.subscribe(this.render.bind(this))
  }

  render() {
    const { documentInfo } = this.state
    this.$target.innerHTML = this.template()
    const $documentBranchLi = document.querySelector(
      `.branch-of-${documentInfo.id}`
    )
    const $documentBranchContainer = document.querySelector(
      `.documentBranchContainer`
    )

    const { openedBranches } = store.getState('documentTree')
    const isOpen = openedBranches.some((id) => id === documentInfo.id)
    const isHover = this.state.isHover

    if (isHover) {
      new DocumentBranchButtons({
        $target: $documentBranchContainer,
        props: {
          documentInfo,
        },
      })
    }

    if (!isOpen) return

    if (documentInfo.documents.length === 0) {
      new DocumentEmptyBranch({
        $target: $documentBranchLi,
      })
    } else {
      documentInfo.documents.forEach((documentInfo) => {
        new DocumentBranchComponent({
          $target: $documentBranchLi,
          initialState: {
            isOpen,
            documentInfo,
          },
        })
      })
    }
  }

  mounted() {
    const { id } = this.state.documentInfo
    const { openedBranches } = store.getState('documentTree')
    const isOpen = openedBranches.some((branchId) => branchId === id)

    this.setEvent('click', '.documentLink', () => hashRouter.navigate(id))
    this.setEvent('mouseover ', '.documentBranchContainer', () => {
      this.setState({ isHover: true })
    })
    this.setEvent('mouseout ', '.documentBranchContainer', () => {
      this.setState({ isHover: false })
    })
    this.setEvent('click', '.documentOpenButton', () => {
      if (isOpen) {
        store.dispatch(closeBranch(id))
      } else {
        store.dispatch(openBranch(id))
      }
    })
  }
}
