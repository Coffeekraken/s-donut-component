"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("coffeekraken-sugar/js/core/SWebComponent"));

var _addEventListener = _interopRequireDefault(require("coffeekraken-sugar/js/dom/addEventListener"));

var _nodeIndex = _interopRequireDefault(require("coffeekraken-sugar/js/dom/nodeIndex"));

var _strToHtml = _interopRequireDefault(require("coffeekraken-sugar/js/utils/strings/strToHtml"));

var _wrapInner = _interopRequireDefault(require("coffeekraken-sugar/js/dom/wrapInner"));

var _animejs = _interopRequireDefault(require("animejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
var SDonutComponent =
/*#__PURE__*/
function (_SWebComponent) {
  _inherits(SDonutComponent, _SWebComponent);

  function SDonutComponent() {
    _classCallCheck(this, SDonutComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SDonutComponent).apply(this, arguments));
  }

  _createClass(SDonutComponent, [{
    key: "componentWillMount",

    /**
     * Component will mount
     * @definition    SWebComponent.componentWillMount
     * @protected
     */
    value: function componentWillMount() {
      _get(_getPrototypeOf(SDonutComponent.prototype), "componentWillMount", this).call(this);
    }
    /**
     * Mount component
     * @definition    SWebComponent.componentMount
     * @protected
     */

  }, {
    key: "componentMount",
    value: function componentMount() {
      _get(_getPrototypeOf(SDonutComponent.prototype), "componentMount", this).call(this); // create the html structure


      this._createHtml(); // add base segment


      var baseColor = this.props.baseColor || "currentColor";
      this.addSegment(0, 100, baseColor, "base", false);
      this.setSegmentOpacity(this.props.baseOpacity, "base"); // add the segments found in the segments prop

      this.addSegments(this.props.segments); // listen for resize

      this._removeResizeHandler = (0, _addEventListener.default)(window, "resize", this._resizeHandler.bind(this));
    }
    /**
     * Component unmount
     * @definition    SWebComponent.componentUnmount
     * @protected
     */

  }, {
    key: "componentUnmount",
    value: function componentUnmount() {
      _get(_getPrototypeOf(SDonutComponent.prototype), "componentUnmount", this).call(this);

      if (this._removeResizeHandler) this._removeResizeHandler();
    }
    /**
     * Component will receive prop
     * @definition    SWebComponent.componentWillReceiveProp
     * @protected
     */

  }, {
    key: "componentWillReceiveProp",
    value: function componentWillReceiveProp(name, newVal, oldVal) {
      var _this = this;

      _get(_getPrototypeOf(SDonutComponent.prototype), "componentWillReceiveProp", this).call(this, name, newVal, oldVal);

      switch (name) {
        case "strokeWidth":
          // loop on each segments
          Array.from(this.querySelectorAll("circle[name]"), function ($segment) {
            // get the name
            var segmentName = $segment.getAttribute("name"); // get the stroke width

            var strokeWidth = _this._getStrokeWidth(newVal); // apply new stroke width


            _this.setSegmentStrokeWidth(strokeWidth, segmentName);
          });
          break;

        case "baseColor":
          // set base segment color
          this.setSegmentColor(newVal, "base");
          break;

        case "baseOpacity":
          // set base segment opacity
          this.setSegmentOpacity(newVal, "base");
          break;

        case "segments":
          // remove all the existing segments
          Array.from(this.querySelectorAll("circle[name]"), function ($segment) {
            $segment.remove();
          }); // loop on each new segments

          if (!newVal) return; // add the new segments

          this.addSegments(newVal);
          break;

        default:
      }
    }
    /**
     * Add some segments
     * @param    {Array<Object>}    segments    The segments to add
     * @return    {SDonutComponent}    The component itself to maintain chainability
     */

  }, {
    key: "addSegments",
    value: function addSegments(segments) {
      var _this2 = this;

      segments.forEach(function (segment) {
        _this2.addSegment(segment.start, segment.end, segment.color, segment.name, segment.animate);
      });
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

  }, {
    key: "addSegment",
    value: function addSegment(start, end) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "currentColor";
      var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "default";
      var animate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var offset = 25 + start * -1;
      var dashArray0 = 0;
      var dashArray1 = 100 - dashArray0; // get the stroke width interpolated from the size of the donut

      var strokeWidth = this._getStrokeWidth(); // create the segment element


      var $segment = document.createElement("circle");
      $segment.setAttribute("cx", 16 + strokeWidth / 2);
      $segment.setAttribute("cy", 16 + strokeWidth / 2);
      $segment.setAttribute("r", 15.91549430918952);
      $segment.setAttribute("fill", "transparent");
      $segment.setAttribute("stroke", color);
      $segment.setAttribute("stroke-width", strokeWidth);
      $segment.setAttribute("stroke-dasharray", "".concat(dashArray0, " ").concat(dashArray1));
      $segment.setAttribute("stroke-dashoffset", offset);
      $segment.setAttribute("name", name);
      $segment.setAttribute("animate", animate); // append the segment in the svg

      this._$svg.appendChild($segment); // set the segment value


      this.setSegmentValues(start, end, name); // return this to maintain chainability

      return this;
    }
    /**
     * Set a segment animate value
     * @param    {Boolean}    animate    If want to animate the segment or not
     * @param    {String}   [name="default"]    The name of the segment to update
     * @return    {SDonutComponent}    The component itself to maintain chainability
     */

  }, {
    key: "setSegmentAnimate",
    value: function setSegmentAnimate(animate) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
      // get the segment
      var $segment = this.getSegmentByName(name); // set the animate parameter

      $segment.setAttribute("animate", animate); // maintain chainability

      return this;
    }
    /**
     * Set a segment opacity value
     * @param    {Boolean}    opacity    The opacity to set between 0 and 1
     * @param    {String}   [name="default"]    The name of the segment to update
     * @return    {SDonutComponent}    The component itself to maintain chainability
     */

  }, {
    key: "setSegmentOpacity",
    value: function setSegmentOpacity(opacity) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
      // get the segment
      var $segment = this.getSegmentByName(name); // set the animate parameter

      $segment.setAttribute("opacity", opacity); // maintain chainability

      return this;
    }
    /**
     * Set a segment stroke width value
     * @param    {Boolean}    width    The new stroke width to apply to the segment
     * @param    {String}   [name="default"]    The name of the segment to update
     * @return    {SDonutComponent}    The component itself to maintain chainability
     */

  }, {
    key: "setSegmentStrokeWidth",
    value: function setSegmentStrokeWidth(width) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
      // get the segment
      var $segment = this.getSegmentByName(name); // set the animate parameter

      $segment.setAttribute("stroke-width", width);
      $segment.setAttribute("cx", 16 + width / 2);
      $segment.setAttribute("cy", 16 + width / 2); // fix draw

      this._updateSvgFix(); // maintain chainability


      return this;
    }
    /**
     * Set a segment color
     * @param    {String}    color    THe color to apply
     * @param    {String}   [name="default"]    The name of the segment to update
     * @return    {SDonutComponent}    The component itself to maintain chainability
     */

  }, {
    key: "setSegmentColor",
    value: function setSegmentColor(color) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
      // get the segment
      var $segment = this.getSegmentByName(name); // set the stroke color

      $segment.setAttribute("stroke", color); // update the svg

      this._updateSvgFix(); // maintain chainability


      return this;
    }
    /**
     * Set the segment value
     * @param    {Integer}    start    The start value of the segment
     * @param    {Integer}    end    The end value of the segment
     * @param    {String}    [name="default"]    The name of the segment to update
     * @return    {SDonutComponent}    The component itself to maintain chainability
     */

  }, {
    key: "setSegmentValues",
    value: function setSegmentValues(start, end) {
      var _this3 = this;

      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "default";
      var offset = 25 + start * -1;
      var dashArray0 = end - start;
      var dashArray1 = 100 - dashArray0; // grab the segment

      var $segment = this.getSegmentByName(name); // need to animate or note

      var animate = $segment.getAttribute("animate") === "true"; // try to get initial values from the segment

      var dashArrayAttr = $segment.getAttribute("stroke-dasharray");
      var dashOffsetAttr = $segment.getAttribute("stroke-dashoffset"); // get the index of the $segment inside the svg

      var indexInSvg = (0, _nodeIndex.default)($segment); // construct the initial obj to animate

      var obj = {
        dashArray0: parseInt(dashArrayAttr ? dashArrayAttr.split(" ")[0] : 0, 10),
        dashArray1: parseInt(dashArrayAttr ? dashArrayAttr.split(" ")[1] : 0, 10),
        offset: parseInt(dashOffsetAttr || 25, 10)
      };

      if (animate) {
        (0, _animejs.default)({
          targets: obj,
          offset: offset,
          dashArray0: dashArray0,
          dashArray1: dashArray1,
          delay: this.props.cascade ? indexInSvg * this.props.animationDuration : 0,
          duration: this.props.animationDuration,
          easing: this.props.animationEasing,
          update: function update() {
            var $seg = _this3.getSegmentByName(name);

            $seg.setAttribute("stroke-dasharray", "".concat(obj.dashArray0, " ").concat(obj.dashArray1));
            $seg.setAttribute("stroke-dashoffset", obj.offset);

            _this3._updateSvgFix();
          }
        });
      } else {
        $segment.setAttribute("stroke-dasharray", "".concat(dashArray0, " ").concat(dashArray1));
        $segment.setAttribute("stroke-dashoffset", offset);

        this._updateSvgFix();
      } // maintain chainability


      return this;
    }
    /**
     * Get the segment dom element by name
     * @param    {String}    name    The name of the segment wanted
     * @return    {HTMLElement}    The segment dom element
     */

  }, {
    key: "getSegmentByName",
    value: function getSegmentByName(name) {
      // get the segment in the stack
      var $segment = this._$svg.querySelector("circle[name=\"".concat(name, "\"]"));

      if (!$segment) {
        throw new Error("Their's no segments called \"".concat(name, "\" registered..."));
      }

      return $segment;
    }
    /**
     * Get the stroke width depending on the size of the donut
     * @return    {Number}    The stroke width
     */

  }, {
    key: "_getStrokeWidth",
    value: function _getStrokeWidth() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var sizeRatio = 32 / this.offsetWidth;
      return (width || this.props.strokeWidth) * sizeRatio;
    }
    /**
     * Resize handler
     * @param    {Event}    e    The resize event
     */

  }, {
    key: "_resizeHandler",
    value: function _resizeHandler() {
      var _this4 = this;

      // calculate new stroke width
      var strokeWidth = this._getStrokeWidth(); // loop on each segments


      Array.from(this.querySelectorAll("circle[name]"), function ($segment) {
        // get the name
        var segmentName = $segment.getAttribute("name"); // apply new stroke width

        _this4.setSegmentStrokeWidth(strokeWidth, segmentName);
      }); // apply the new viewport

      this._$svg.setAttribute("viewBox", "0 0 ".concat(32 + strokeWidth, " ").concat(32 + strokeWidth));
    }
    /**
     * Ugly fix to update the svg render
     */

  }, {
    key: "_updateSvgFix",
    value: function _updateSvgFix() {
      this._$svg.innerHTML += "";
    }
    /**
     * Create the HTML structure
     */

  }, {
    key: "_createHtml",
    value: function _createHtml() {
      // wrapp the content of the donut into the donut__content div
      var $content = document.createElement("div");
      $content.classList.add("".concat(this.componentNameDash, "__content"));
      (0, _wrapInner.default)(this, $content); // create the base svg

      var strokeWidth = this._getStrokeWidth();

      var $svg = (0, _strToHtml.default)("\n      <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 ".concat(32 + strokeWidth, " ").concat(32 + strokeWidth, "\" version=\"1.1\" baseProfile=\"full\" xmlns=\"http://www.w3.org/2000/svg\"></svg>\n    "));
      this.appendChild($svg);
      this._$svg = this.querySelector("svg");
    }
  }], [{
    key: "defaultCss",

    /**
     * Css
     * @protected
     */
    value: function defaultCss(componentName, componentNameDash) {
      return "\n      ".concat(componentNameDash, " {\n        display: inline-block;\n        position: relative;\n      }\n      .").concat(componentNameDash, "__content {\n        position: absolute;\n        top: 50%; left: 50%;\n        transform: translateX(-50%) translateY(-50%);\n        text-align: center;\n      }\n    ");
    }
  }, {
    key: "defaultProps",

    /**
     * Default props
     * @definition    SWebComponent.defaultProps
     * @protected
     */
    get: function get() {
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
      };
    }
    /**
     * Physical props
     * @definition    SWebComponent.physicalProps
     * @protected
     */

  }, {
    key: "physicalProps",
    get: function get() {
      return [];
    }
  }]);

  return SDonutComponent;
}(_SWebComponent2.default);

exports.default = SDonutComponent;