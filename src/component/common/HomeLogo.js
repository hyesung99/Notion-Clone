import Component from '../../core/Component'
import { hashRouter } from '../../router/hashRouter'

export default class HomeLogo extends Component {
  template() {
    return `
      <div class="home-logo">
        <h3 class="home-logo-text">Notion Clone</h3>
      </div>
    `
  }

  mounted() {
    this.setEvent('click', '.home-logo-text', () => {
      hashRouter.navigate('')
    })
  }
}
