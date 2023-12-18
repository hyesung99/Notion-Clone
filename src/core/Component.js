export default class Component {
  $target
  state
  props
  state

  constructor(componentOptions) {
    this.created()
    const { $target, initialState, props } = componentOptions
    this.$target = $target
    this.state = initialState
    this.props = props || {}
    this.render()
    if (props && props.events) {
      this.setEvent(props.events)
    }
    this.mounted()
  }

  template() {
    return ''
  }
  created() {}

  setEvent(action, selector, callback) {
    this.$target.addEventListener(action, (event) => {
      if (event.target.closest(`${selector}`)) {
        callback({ event, target: event.target.closest(selector) })
      }
    })
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }
  render() {
    this.$target.innerHTML = this.template()
  }

  mounted() {}

  createChildComponent({ component, componentOptions }) {
    new component(componentOptions)
  }
}
