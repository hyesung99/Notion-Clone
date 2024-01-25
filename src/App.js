import Component from './core/Component.js'
import DocumentTree from './component/DocumentTree.js'
import { hashRouter } from './router/hashRouter.js'

export default class App extends Component {
  template() {
    return `
    <aside class='document-tree'></aside>
    <section class='page-section'/>
  `
  }

  async render() {
    this.$target.innerHTML = this.template()

    const $documentTree = this.$target.querySelector('.document-tree')

    this.createChildComponent({
      component: DocumentTree,
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
