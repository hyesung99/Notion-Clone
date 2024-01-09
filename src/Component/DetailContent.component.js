export default class DetailContent extends Component {
  template() {
    return `
      <textarea class="detail-content"></textarea>
    `
  }

  render() {
    this.$target.innerHTML = this.template()
  }

  mounted() {}
}
