import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import style from "coffeekraken-sugar/js/dom/style"
import anime from "animejs"

export default class SDonutComponent extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
    return {
      /**
       * Specify the stroke width in px
       * @prop
       * @type    {Integer}
       */
      strokeWidth: 20,

      /**
       * Specify the segents wanted. A segment is an object composed of these properties:
       * [{
       *   name: 'my-cool-segment', // a name for your segment (required)
       *   color: '#ff0000', // a color for my segment (required)
       *   start: 10, // start percentage (required)
       *   end: 50, // end percentage (required)
       *   animate: true // if wanted animation on value change or not (default: true)
       * }]
       * @prop
       * @type    {Array<Object>}
       */
      segments: [],

      /**
       * Specify the animation duration for the segments in ms
       * @prop
       * @type    {Integer}
       */
      animationDuration: 1200,

      /**
       * Specify the animation easing for the segment. Can be any [animejs](https://animejs.com/documentation/#pennerFunctions) easing
       * @prop
       * @type    {String}
       */
      animationEasing: "easeInOutExpo"
    }
  }

  /**
   * Physical props
   * @definition    SWebComponent.physicalProps
   * @protected
   */
  static get physicalProps() {
    return []
  }

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display: inline-block;
      }
    `
  }

  /**
   * Component will mount
   * @definition    SWebComponent.componentWillMount
   * @protected
   */
  componentWillMount() {
    super.componentWillMount()

    // internal variables
    this._$segments = {}
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()

    // create the html structure
    this._createHtml()

    // loop on segments passed through the props
    this.props.segments.forEach(segment => {
      this.addSegment(
        segment.name,
        segment.start,
        segment.end,
        segment.color,
        segment.animate
      )
    })

    // this.addSegment("default", "red", 10, 50)
    // this.addSegment("more", "blue", 0, 10)

    // setTimeout(() => {
    //   this.addSegment("more1", "yellow", 40, 85, false)
    // }, 2000)
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()
  }

  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */
  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)
  }

  /**
   * Add a segment
   * @param    {String}    name    A name for my segment. No special characters here...
   * @param    {Integer}    start    The start percentage for my segment
   * @param    {Integet}    end    The end percentage for my segment
   * @param    {String}    [color=currentColor]    A color for my segment. Ex: #ff0000
   * @param    {Boolean}    [animate=true]    If want the segment to be animated
   */
  addSegment(name, start, end, color = "currentColor", animate = true) {
    const offset = 25 + start * -1
    const dashArray0 = 0
    const dashArray1 = 100 - dashArray0

    // calculate the ratio of original size (42x42) to actual size
    const sizeRatio = 42 / this.offsetWidth

    // calculate the stroke width depending on the size ratio
    const strokeWidth = this.props.strokeWidth * sizeRatio

    // create the segment element
    const $segment = document.createElement("circle")
    $segment.setAttribute("cx", 21)
    $segment.setAttribute("cy", 21)
    $segment.setAttribute("r", 15.91549430918952)
    $segment.setAttribute("fill", "transparent")
    $segment.setAttribute("stroke", color)
    $segment.setAttribute("stroke-width", strokeWidth)
    $segment.setAttribute("stroke-dasharray", `${dashArray0} ${dashArray1}`)
    $segment.setAttribute("stroke-dashoffset", offset)
    $segment.setAttribute("name", name)
    $segment.setAttribute("animate", animate)

    // append the segment in the svg
    this._$svg.appendChild($segment)

    // set the segment value
    this.setSegmentValues(name, start, end, animate)
  }

  /**
   * Set a segment animate value
   * @param    {String}   name    The name of the segment to update
   * @param    {Boolean}    animate    If want to animate the segment or not
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentAnimate(name, animate) {
    // get the segment
    const $segment = this.getSegmentByName(name)
    // set the animate parameter
    $segment.setAttribute("animate", animate)
  }

  /**
   * Set a segment color
   * @param    {String}   name    The name of the segment to update
   * @param    {String}    color    THe color to apply
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentColor(name, color) {
    // get the segment
    const $segment = this.getSegmentByName(name)
    // set the stroke color
    $segment.setAttribute("stroke", color)
    // update the svg
    this._updateSvgFix()
  }

  /**
   * Set the segment value
   * @param    {String}    name    The name of the segment to update
   * @param    {Integer}    start    The start value of the segment
   * @param    {Integer}    end    The end value of the segment
   * @param    {Boolean}    [animate=true]    true if want the animation, false if not
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentValues(name, start, end) {
    const offset = 25 + start * -1
    const dashArray0 = end - start
    const dashArray1 = 100 - dashArray0

    // grab the segment
    const $segment = this.getSegmentByName(name)

    // need to animate or note
    const animate = $segment.getAttribute("animate") === "true"

    // try to get initial values from the segment
    const dashArrayAttr = $segment.getAttribute("stroke-dasharray")
    const dashOffsetAttr = $segment.getAttribute("stroke-dashoffset")

    // construct the initial obj to animate
    const obj = {
      dashArray0: parseInt(dashArrayAttr ? dashArrayAttr.split(" ")[0] : 0),
      dashArray1: parseInt(dashArrayAttr ? dashArrayAttr.split(" ")[1] : 0),
      offset: parseInt(dashOffsetAttr || 25)
    }

    if (animate) {
      anime({
        targets: obj,
        offset,
        dashArray0,
        dashArray1,
        duration: this.props.animationDuration,
        easing: this.props.animationEasing,
        update: () => {
          const $segment = this.getSegmentByName(name)
          $segment.setAttribute(
            "stroke-dasharray",
            `${obj.dashArray0} ${obj.dashArray1}`
          )
          $segment.setAttribute("stroke-dashoffset", obj.offset)
          this._updateSvgFix()
        }
      })
    } else {
      $segment.setAttribute("stroke-dasharray", `${dashArray0} ${dashArray1}`)
      $segment.setAttribute("stroke-dashoffset", offset)
      this._updateSvgFix()
    }

    // maintain chainability
    return this
  }

  /**
   * Get the segment dom element by name
   * @param    {String}    name    The name of the segment wanted
   * @return    {HTMLElement}    The segment dom element
   */
  getSegmentByName(name) {
    // get the segment in the stack
    const $segment = this._$svg.querySelector(`circle[name="${name}"]`)
    if (!$segment) {
      throw new Error(`Their's no segments called "${name}" registered...`)
    }
    return $segment
  }

  /**
   * Ugly fix to update the svg render
   */
  _updateSvgFix() {
    this._$svg.innerHTML += ""
  }

  /**
   * Create the HTML structure
   */
  _createHtml() {
    const svg = `
      <svg width="100%" height="100%" viewBox="0 0 42 42" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg"></svg>
    `
    this.innerHTML = svg

    this._$svg = this.querySelector("svg")
  }
}
