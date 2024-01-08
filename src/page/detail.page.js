import Component from '../core/Component.js'
import DetailTitleComponent from '../component/DetailTitle.component.js'

export default class DetailPage extends Component {
  template() {
    return `
      <div class="detail-page">
        <section class="detail-header"/>
        <section class="detail-body"/>
      </div>
    `
  }

  created() {}

  render() {
    this.$target.innerHTML = this.template()
    this.createChildComponent({
      component: DetailTitleComponent,
      componentOptions: {
        $target: document.querySelector('.detail-header'),
      },
    })
  }
}
