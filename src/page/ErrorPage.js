import Component from '../core/Component'
import { hashRouter } from '../router/hashRouter'

export default class ErrorPage extends Component {
  template() {
    return `
      <div class="error-page">
        <h1 class="error-page-title">404 NOT FOUND</h1>
        <p class="error-page-description">페이지를 찾을 수 없습니다.</p>
        <button class="error-page-button">홈으로</button>
      </div>
    `
  }

  mounted() {
    this.setEvent('click', '.error-page-button', () => {
      hashRouter.navigate('')
    })
  }
}
