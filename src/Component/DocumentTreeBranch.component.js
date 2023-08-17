import Component from '../core/Component.js'

export default class DocumentTreeBranchComponent extends Component {
  template() {
    const { title, id } = this.state.branch
    return `
    <span class="documentLicontainer">
          <a class="documentLink" href="/documents/${id}">${title}</a>
          <span class="documentTreeButtonContainer">
            <button class="addDocumentButton" data-id="${id}">+</button>
            <button class="deleteDocumentButton" data-id="${id}">x</button>
          </span>
        </span> 
    `
  }
  render() {
    const $li = document.createElement('li')
    $li.id = this.state.branch.id
    $li.innerHTML = this.template()
    this.$target.appendChild($li)
  }
}
