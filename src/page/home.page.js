import Component from '../core/Component.js'

export default class HomePage extends Component {
  template() {
    return `
      <div class="home-page">
        <h1>홈페이지</h1>
        <div class="document-list"></div>
      </div>
    `
  }
}
