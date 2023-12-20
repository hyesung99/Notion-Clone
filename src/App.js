import Component from './core/Component.js'
import { DocumentTreeComponent, EditorComponent } from './Component/index.js'

export default class App extends Component {
  template() {
    return `
    <aside id='documentTree'></aside>
    <section id='editor'></section>
  `
  }

  async render() {
    this.$target.innerHTML = this.template()

    const $documentTree = this.$target.querySelector('#documentTree')

    this.createChildComponent({
      component: DocumentTreeComponent,
      componentOptions: {
        $target: $documentTree,
      },
    })

    const $editor = this.$target.querySelector('#editor')
    this.createChildComponent({
      component: EditorComponent,
      componentOptions: {
        $target: $editor,
        initialState: { document: await getRecentDocument() },
      },
    })
  }
}
