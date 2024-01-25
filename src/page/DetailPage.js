import Component from '../core/Component.js'
import DetailTitle from '../component/DetailTitle.js'
import DetailContent from '../component/DetailContent.js'

export default class DetailPage extends Component {
  template() {
    return `
      <div class="detail-page">
        <section class="title-section"></section>
        <section class="content-section"/></section>
      </div>
    `
  }

  render() {
    this.$target.innerHTML = this.template()

    this.createChildComponent({
      component: DetailTitle,
      componentOptions: {
        $target: document.querySelector('.title-section'),
      },
    })

    this.createChildComponent({
      component: DetailContent,
      componentOptions: {
        $target: document.querySelector('.content-section'),
      },
    })
  }
}
