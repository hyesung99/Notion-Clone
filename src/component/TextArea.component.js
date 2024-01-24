import Component from '../core/Component.js'

export default class TextArea extends Component {
  template() {
    const { content } = this.props
    return `
      <div contenteditable="true" class="detail-content">${content ?? ''}</div>
    `
  }

  mounted() {
    const { onKeyUp, onBlur } = this.props
    this.setEvent('input', '.detail-content', onKeyUp)
    this.setEvent('input', '.detail-content', onBlur)
  }
}
