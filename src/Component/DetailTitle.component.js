import Component from '../core/Component.js'

export default class Title extends Component {
  template() {
    return `
      <input class="detail-title" value=${this.props.title}>
    `
  }

  render() {
    this.$target.innerHTML = this.template()
  }
}
