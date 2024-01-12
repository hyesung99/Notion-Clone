import Component from './core/Component.js'
import TreeComponent from './component/Tree.component.js'
import { hashRouter } from './router/hashRouter.js'

export default class App extends Component {
  template() {
    return `
    <aside id='document-tree'></aside>
    <section class='page-section'/>
  `
  }

  async render() {
    this.$target.innerHTML = this.template()

    const $documentTree = this.$target.querySelector('#document-tree')

    this.createChildComponent({
      component: TreeComponent,
      componentOptions: {
        $target: $documentTree,
      },
    })

    const $pageSection = this.$target.querySelector('.page-section')

    hashRouter.subscribe((matchedRoute) =>
      this.createChildComponent({
        component: matchedRoute,
        componentOptions: {
          $target: $pageSection,
        },
      })
    )
  }
}
