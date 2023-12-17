import Component from './core/Component.js'
import { DocumentTreeComponent, EditorComponent } from './Component/index.js'
import {
  addDocumentButtonClickEvent,
  documentLinkClickEvent,
  deleteDocumentButtonClickEvent,
  documentInputChangeEvent,
  textareaKeyupEvent,
  titleKeyupEvent,
  titleFocusoutEvent,
  textareaFocusoutEvent,
} from './events/index.js'
import { hashRouter } from './router/hashRouter.js'
import { getRecentDocument } from './service/documentService.js'
import { getDocumentTree } from './apis/documentTree.api.js'

export default class App extends Component {
  mount() {
    hashRouter.observe(async () => {
      this.editor.state = await getRecentDocument()
    })
  }

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
        initialState: { documentTree: await getDocumentTree() },
      },
    })

    const $editor = this.$target.querySelector('#editor')
    this.createChildComponent({
      component: EditorComponent,
      componentOptions: {
        $target: $editor,
        initialState: { document: await getRecentDocument() },
        props: {
          events: [
            {
              action: 'keyup',
              tag: '.textarea',
              target: '.textarea',
              callback: ({ target }) => {
                textareaKeyupEvent({
                  title: this.editor.state.title,
                  content: target.textContent,
                })
              },
            },
            {
              action: 'keyup',
              tag: '.title',
              target: '.title',
              callback: ({ target }) => {
                titleKeyupEvent({
                  title: target.textContent,
                  content: this.editor.state.content,
                })
              },
            },
            {
              action: 'focusout',
              tag: '.title',
              target: '.title',
              callback: async ({ target }) => {
                titleFocusoutEvent({
                  documentTree: this.documentTree,
                  editor: this.editor,
                  title: target.textContent,
                })
              },
            },
            {
              action: 'focusout',
              tag: '.textarea',
              target: '.textarea',
              callback: ({ target }) => {
                textareaFocusoutEvent({
                  editor: this.editor,
                  content: target.textContent,
                })
              },
            },
          ],
        },
      },
    })
  }
}
