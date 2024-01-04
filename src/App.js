import Component from './core/Component.js'
import DocumentTreeComponent from './component/Tree.component.js'
import { hashRouter } from './router/hashRouter.js'

export default class App extends Component {
  template() {
    return `
    <aside id='document-tree'></aside>
    <section id='detail'/>
  `
  }

  async render() {
    this.$target.innerHTML = this.template()

    const $documentTree = this.$target.querySelector('#document-tree')

    this.createChildComponent({
      component: DocumentTreeComponent,
      componentOptions: {
        $target: $documentTree,
      },
    })

    const $detail = this.$target.querySelector('#detail')

    hashRouter.subscribe((matchedRoute) =>
      this.createChildComponent({
        component: matchedRoute,
        componentOptions: {
          $target: $detail,
        },
      })
    )
  }
}
