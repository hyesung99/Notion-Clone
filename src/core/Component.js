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
  setEvent(events) {
    events.forEach((event) => this.setEventDelegation(event))
  }
  setState(nextState) {
    this.state = nextState
    this.render()
  }
  render() {
    this.$target.innerHTML = this.template()
  }

  setEventDelegation({ action, tag, target, callback }) {
    this.$target.addEventListener(action, (event) => {
      if (event.target.closest(`${tag}`)) {
        callback({ event, target: event.target.closest(target) })
      }
    })
  }
  mounted() {}

  createChildComponent({ component, componentOptions }) {
    return new component(componentOptions)
  }
}
