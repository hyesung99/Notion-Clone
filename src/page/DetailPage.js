import Component from '../core/Component.js'
import DetailTitleComponent from '../component/DetailTitle.js'
import DetailContentComponent from '../component/DetailContent.js'

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
      component: DetailTitleComponent,
      componentOptions: {
        $target: document.querySelector('.title-section'),
      },
    })

    this.createChildComponent({
      component: DetailContentComponent,
      componentOptions: {
        $target: document.querySelector('.content-section'),
      },
    })
  }
}
