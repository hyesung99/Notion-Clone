import Component from '../core/Component.js'

class DocumentEmptyBranch extends Component {
  template() {
    return `
      <div class='documentBranchContainer'>
        <p class='emptyBranchTitle'>하위 페이지 없음</p>
      </div>`
  }

  render() {
    this.$target.innerHTML = this.template()
  }
}

export default DocumentEmptyBranch
