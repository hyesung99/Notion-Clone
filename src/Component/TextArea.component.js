import Component from '../core/Component.js'

export default class TextArea extends Component {
  template() {
    const { content } = this.props
    console.log(this.props)
    return `
      <div contenteditable="true" class="detail-content">${content ?? ''}</div>
    `
  }

  mounted() {
    const { onKeyUp, onBlur } = this.props
    this.setEvent('keyup', '.detail-content', onKeyUp)
    this.setEvent('blur', '.detail-content', onBlur)
  }
}
