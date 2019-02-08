import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import addEventListener from "coffeekraken-sugar/js/dom/addEventListener"
import nodeIndex from "coffeekraken-sugar/js/dom/nodeIndex"
import strToHtml from "coffeekraken-sugar/js/utils/strings/strToHtml"
import wrapInner from "coffeekraken-sugar/js/dom/wrapInner"
import anime from "animejs"

/**
 * Create with ease some nice fully customizable donut charts
 *
 * @example    html
 * <s-donut segments="[{start:0,end:60}]">
 *   <span class="anything-you-want">60%</span>
 *   <!-- anything you want here... -->
 * </s-donut>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
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
      animationDuration: 1000,

      /**
       * Specify the animation easing for the segment. Can be any [animejs](https://animejs.com/documentation/#pennerFunctions) easing
       * @prop
       * @type    {String}
       */
      animationEasing: "easeInOutExpo",

      /**
       * Specify if the animation of segments has to be in cascade or all at the same time
       * @prop
       * @type    {Boolean}
       */
      cascade: false,

      /**
       * Color of the base segment. If not specified, will be "currentColor"
       * @prop
       * @type    {String}
       */
      baseColor: null,

      /**
       * Specify the base segment opacity
       * @prop
       * @type    {Number}
       */
      baseOpacity: 0.1
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
        position: relative;
      }
      .${componentNameDash}__content {
        position: absolute;
        top: 50%; left: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-align: center;
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

    // add base segment
    const baseColor = this.props.baseColor || "currentColor"
    this.addSegment(0, 100, baseColor, "base", false)
    this.setSegmentOpacity(this.props.baseOpacity, "base")

    // add the segments found in the segments prop
    this.addSegments(this.props.segments)

    // listen for resize
    this._removeResizeHandler = addEventListener(
      window,
      "resize",
      this._resizeHandler.bind(this)
    )
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()

    if (this._removeResizeHandler) this._removeResizeHandler()
  }

  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */
  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)

    switch (name) {
      case "strokeWidth":
        // loop on each segments
        Array.from(this.querySelectorAll("circle[name]"), $segment => {
          // get the name
          const segmentName = $segment.getAttribute("name")
          // get the stroke width
          const strokeWidth = this._getStrokeWidth(newVal)
          // apply new stroke width
          this.setSegmentStrokeWidth(strokeWidth, segmentName)
        })
        break
      case "baseColor":
        // set base segment color
        this.setSegmentColor(newVal, "base")
        break
      case "baseOpacity":
        // set base segment opacity
        this.setSegmentOpacity(newVal, "base")
        break
      case "segments":
        // remove all the existing segments
        Array.from(this.querySelectorAll("circle[name]"), $segment => {
          $segment.remove()
        })
        // loop on each new segments
        if (!newVal) return
        // add the new segments
        this.addSegments(newVal)
        break
      default:
    }
  }

  /**
   * Add some segments
   * @param    {Array<Object>}    segments    The segments to add
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  addSegments(segments) {
    segments.forEach(segment => {
      this.addSegment(
        segment.start,
        segment.end,
        segment.color,
        segment.name,
        segment.animate
      )
    })
  }

  /**
   * Add a segment
   * @param    {Integer}    start    The start percentage for my segment
   * @param    {Integet}    end    The end percentage for my segment
   * @param    {String}    [color=currentColor]    A color for my segment. Ex: #ff0000
   * @param    {String}    [name="default"]    A name for my segment. No special characters here...
   * @param    {Boolean}    [animate=true]    If want the segment to be animated
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  addSegment(
    start,
    end,
    color = "currentColor",
    name = "default",
    animate = true
  ) {
    const offset = 25 + start * -1
    const dashArray0 = 0
    const dashArray1 = 100 - dashArray0

    // get the stroke width interpolated from the size of the donut
    const strokeWidth = this._getStrokeWidth()

    // create the segment element
    const $segment = document.createElement("circle")
    $segment.setAttribute("cx", 16 + strokeWidth / 2)
    $segment.setAttribute("cy", 16 + strokeWidth / 2)
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
    this.setSegmentValues(start, end, name)

    // return this to maintain chainability
    return this
  }

  /**
   * Set a segment animate value
   * @param    {Boolean}    animate    If want to animate the segment or not
   * @param    {String}   [name="default"]    The name of the segment to update
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentAnimate(animate, name = "default") {
    // get the segment
    const $segment = this.getSegmentByName(name)
    // set the animate parameter
    $segment.setAttribute("animate", animate)
    // maintain chainability
    return this
  }

  /**
   * Set a segment opacity value
   * @param    {Boolean}    opacity    The opacity to set between 0 and 1
   * @param    {String}   [name="default"]    The name of the segment to update
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentOpacity(opacity, name = "default") {
    // get the segment
    const $segment = this.getSegmentByName(name)
    // set the animate parameter
    $segment.setAttribute("opacity", opacity)
    // maintain chainability
    return this
  }

  /**
   * Set a segment stroke width value
   * @param    {Boolean}    width    The new stroke width to apply to the segment
   * @param    {String}   [name="default"]    The name of the segment to update
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentStrokeWidth(width, name = "default") {
    // get the segment
    const $segment = this.getSegmentByName(name)
    // set the animate parameter
    $segment.setAttribute("stroke-width", width)
    $segment.setAttribute("cx", 16 + width / 2)
    $segment.setAttribute("cy", 16 + width / 2)
    // fix draw
    this._updateSvgFix()
    // maintain chainability
    return this
  }

  /**
   * Set a segment color
   * @param    {String}    color    THe color to apply
   * @param    {String}   [name="default"]    The name of the segment to update
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentColor(color, name = "default") {
    // get the segment
    const $segment = this.getSegmentByName(name)
    // set the stroke color
    $segment.setAttribute("stroke", color)
    // update the svg
    this._updateSvgFix()
    // maintain chainability
    return this
  }

  /**
   * Set the segment value
   * @param    {Integer}    start    The start value of the segment
   * @param    {Integer}    end    The end value of the segment
   * @param    {String}    [name="default"]    The name of the segment to update
   * @return    {SDonutComponent}    The component itself to maintain chainability
   */
  setSegmentValues(start, end, name = "default") {
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

    // get the index of the $segment inside the svg
    const indexInSvg = nodeIndex($segment)

    // construct the initial obj to animate
    const obj = {
      dashArray0: parseInt(dashArrayAttr ? dashArrayAttr.split(" ")[0] : 0, 10),
      dashArray1: parseInt(dashArrayAttr ? dashArrayAttr.split(" ")[1] : 0, 10),
      offset: parseInt(dashOffsetAttr || 25, 10)
    }

    if (animate) {
      anime({
        targets: obj,
        offset,
        dashArray0,
        dashArray1,
        delay: this.props.cascade
          ? indexInSvg * this.props.animationDuration
          : 0,
        duration: this.props.animationDuration,
        easing: this.props.animationEasing,
        update: () => {
          const $seg = this.getSegmentByName(name)
          $seg.setAttribute(
            "stroke-dasharray",
            `${obj.dashArray0} ${obj.dashArray1}`
          )
          $seg.setAttribute("stroke-dashoffset", obj.offset)
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
   * Get the stroke width depending on the size of the donut
   * @return    {Number}    The stroke width
   */
  _getStrokeWidth(width = null) {
    const sizeRatio = 32 / this.offsetWidth
    return (width || this.props.strokeWidth) * sizeRatio
  }

  /**
   * Resize handler
   * @param    {Event}    e    The resize event
   */
  _resizeHandler() {
    // calculate new stroke width
    const strokeWidth = this._getStrokeWidth()
    // loop on each segments
    Array.from(this.querySelectorAll("circle[name]"), $segment => {
      // get the name
      const segmentName = $segment.getAttribute("name")
      // apply new stroke width
      this.setSegmentStrokeWidth(strokeWidth, segmentName)
    })
    // apply the new viewport
    this._$svg.setAttribute(
      "viewBox",
      `0 0 ${32 + strokeWidth} ${32 + strokeWidth}`
    )
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
    // wrapp the content of the donut into the donut__content div
    const $content = document.createElement("div")
    $content.classList.add(`${this.componentNameDash}__content`)
    wrapInner(this, $content)

    // create the base svg
    const strokeWidth = this._getStrokeWidth()
    const $svg = strToHtml(`
      <svg width="100%" height="100%" viewBox="0 0 ${32 + strokeWidth} ${32 +
      strokeWidth}" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg"></svg>
    `)
    this.appendChild($svg)
    this._$svg = this.querySelector("svg")
  }
}
