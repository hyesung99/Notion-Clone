import Component from '../core/Component.js'
import { store } from '../core/createStore.js'
import { closeBranch, openBranch } from '../store/reducer.js'
import { hashRouter } from '../router/hashRouter.js'
import DocumentBranchButtons from './DocumentBranchButtons.component.js'
import DocumentEmptyBranch from './DocumentEmptyBranch.component.js'

export default class DocumentBranchComponent extends Component {
  template() {
    const { documentInfo } = this.props
    return `
      <div class='branch-container id='branch-${documentInfo.id}'>
        <button class="branch-open-button">▶</button>
        <a class="branch-link">${documentInfo.title}</a>
        <span class="branch-button-container" id="branch-button-${documentInfo.id}"></span>
      </div>
      <ul class="child-branches" id="branch-of-${documentInfo.id}"></ul>
    `
  }

  created() {
    store.subscribe(this.render.bind(this))
  }

  render() {
    const { documentInfo } = this.props
    this.$target.innerHTML = this.template()
    const $childBranches = document.querySelector(
      `#branch-of-${documentInfo.id}`
    )
    const $documentBranchButtonContainer = document.querySelector(
      `#branch-button-${documentInfo.id}`
    )

    const { openedBranches } = store.getState('documentTree')
    const isOpen = openedBranches.has(documentInfo.id)
    const isHover = this.state.isHover

    this.createChildComponent({
      component: DocumentBranchButtons,
      componentOptions: {
        $target: $documentBranchButtonContainer,
        props: {
          documentInfo,
          isVisible: isHover,
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
          component: DocumentBranchComponent,
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
    const { openedBranches } = store.getState('documentTree')
    const isOpen = openedBranches.has(id)

    this.setEvent('click', '.documentLink', () => hashRouter.navigate(id))
    this.setEvent('mouseenter', `.branch-of-${id}`, () => {
      console.log('mouse enter')
      this.setState({ isHover: true })
    })
    this.setEvent('mouseleave', `.branch-of-${id}`, () => {
      console.log('mouse leave')
      this.setState({ isHover: false })
    })
    this.setEvent('click', '.branch-open-button', () => {
      if (isOpen) {
        store.dispatch(closeBranch(id))
      } else {
        store.dispatch(openBranch(id))
      }
    })
  }
}
