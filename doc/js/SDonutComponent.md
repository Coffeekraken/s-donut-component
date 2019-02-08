# SDonutComponent

Create with ease some nice fully customizable donut charts


### Example
```html
	<s-donut segments="[{start:0,end:60}]">
  <span class="anything-you-want">60%</span>
  <!-- anything you want here... -->
</s-donut>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

Extends **SWebComponent**




## Attributes

Here's the list of available attribute(s).

### strokeWidth

Specify the stroke width in px

Type : **{ Integer }**

Default : **20**


### segments

Specify the segents wanted. A segment is an object composed of these properties:
[{
  name: 'my-cool-segment', // a name for your segment (required)
  color: '#ff0000', // a color for my segment (required)
  start: 10, // start percentage (required)
  end: 50, // end percentage (required)
  animate: true // if wanted animation on value change or not (default: true)
}]

Type : **{ Array<Object> }**

Default : **[]**


### animationDuration

Specify the animation duration for the segments in ms

Type : **{ Integer }**

Default : **1000**


### animationEasing

Specify the animation easing for the segment. Can be any [animejs](https://animejs.com/documentation/#pennerFunctions) easing

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **easeInOutExpo**


### cascade

Specify if the animation of segments has to be in cascade or all at the same time

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### baseColor

Color of the base segment. If not specified, will be "currentColor"

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### baseOpacity

Specify the base segment opacity

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0.1**




## Methods


### addSegments

Add some segments


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
segments  |  **{ Array<Object> }**  |  The segments to add  |  required  |

Return **{ SDonutComponent }** The component itself to maintain chainability


### addSegment

Add a segment


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
start  |  **{ Integer }**  |  The start percentage for my segment  |  required  |
end  |  **{ Integet }**  |  The end percentage for my segment  |  required  |
color  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  A color for my segment. Ex: #ff0000  |  optional  |  currentColor
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  A name for my segment. No special characters here...  |  optional  |  "default"
animate  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  If want the segment to be animated  |  optional  |  true

Return **{ SDonutComponent }** The component itself to maintain chainability


### setSegmentAnimate

Set a segment animate value


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
animate  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  If want to animate the segment or not  |  required  |
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  optional  |  "default"

Return **{ SDonutComponent }** The component itself to maintain chainability


### setSegmentOpacity

Set a segment opacity value


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
opacity  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  The opacity to set between 0 and 1  |  required  |
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  optional  |  "default"

Return **{ SDonutComponent }** The component itself to maintain chainability


### setSegmentStrokeWidth

Set a segment stroke width value


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
width  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  The new stroke width to apply to the segment  |  required  |
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  optional  |  "default"

Return **{ SDonutComponent }** The component itself to maintain chainability


### setSegmentColor

Set a segment color


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
color  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  THe color to apply  |  required  |
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  optional  |  "default"

Return **{ SDonutComponent }** The component itself to maintain chainability


### setSegmentValues

Set the segment value


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
start  |  **{ Integer }**  |  The start value of the segment  |  required  |
end  |  **{ Integer }**  |  The end value of the segment  |  required  |
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  optional  |  "default"

Return **{ SDonutComponent }** The component itself to maintain chainability


### getSegmentByName

Get the segment dom element by name


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment wanted  |  required  |

Return **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }** The segment dom element