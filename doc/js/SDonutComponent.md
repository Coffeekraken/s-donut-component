# Attributes

Here's the list of available attribute(s).

## strokeWidth

Specify the stroke width in px

Type : **{ Integer }**

Default : **20**


## segments

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


## animationDuration

Specify the animation duration for the segments in ms

Type : **{ Integer }**

Default : **1200**


## animationEasing

Specify the animation easing for the segment. Can be any [animejs](https://animejs.com/documentation/#pennerFunctions) easing

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **easeInOutExpo**




# Methods


## addSegment

Add a segment


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  A name for my segment. No special characters here...  |  required  |
start  |  **{ Integer }**  |  The start percentage for my segment  |  required  |
end  |  **{ Integet }**  |  The end percentage for my segment  |  required  |
color  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  A color for my segment. Ex: #ff0000  |  optional  |  currentColor
animate  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  If want the segment to be animated  |  optional  |  true


## setSegmentAnimate

Set a segment animate value


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  required  |
animate  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  If want to animate the segment or not  |  required  |

Return **{ SDonutComponent }** The component itself to maintain chainability


## setSegmentColor

Set a segment color


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  required  |
color  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  THe color to apply  |  required  |

Return **{ SDonutComponent }** The component itself to maintain chainability


## setSegmentValues

Set the segment value


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment to update  |  required  |
start  |  **{ Integer }**  |  The start value of the segment  |  required  |
end  |  **{ Integer }**  |  The end value of the segment  |  required  |
animate  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  true if want the animation, false if not  |  optional  |  true

Return **{ SDonutComponent }** The component itself to maintain chainability


## getSegmentByName

Get the segment dom element by name


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
name  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The name of the segment wanted  |  required  |

Return **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }** The segment dom element