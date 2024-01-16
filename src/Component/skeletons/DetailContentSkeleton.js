import Component from '../../core/Component.js'
export default class DetailContentSkeleton extends Component {
  template() {
    return `
    <div class="content-skeleton skeleton">
    </div>
    <div class="content-skeleton skeleton">
    </div>
    <div class="content-skeleton skeleton">
    </div>
    `
  }
}
