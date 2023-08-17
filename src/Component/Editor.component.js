import Component from '../core/Component.js'
export default class EditorComponent extends Component {
  template() {
    const { title, content, id } = this.state.document
    return `
      <div class="editorContainer">
        <div class="title" maxLength="20"${
          id === -1 ? `contentEditable="false"` : `contentEditable="true"`
        }>
          ${title}
        </div>
        <div class="textarea" ${
          id === -1 ? `contentEditable="false"` : `contentEditable="true"`
        }>
          ${content || ''}
        </div>
      </div>
      `
  }
}
