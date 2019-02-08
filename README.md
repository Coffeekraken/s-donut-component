# Coffeekraken s-donut-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken/s-donut-component">
		<img src="https://img.shields.io/travis/coffeekraken/s-donut-component.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-s-donut-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-donut-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-donut-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-donut-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/s-donut-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-donut-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-donut-component">
		<img src="https://img.shields.io/github/forks/coffeekraken/s-donut-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-donut-component">
		<img src="https://img.shields.io/github/stars/coffeekraken/s-donut-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

<p class="lead">Create with ease some nice fully customizable donut charts</p>

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-donut-component)

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-donut-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Segments](#readme-segments)
5. [API](#readme-api)
6. [Javascript API](doc/js)
7. [Sugar Web Components Documentation](https://github.com/coffeekraken/sugar/blob/master/doc/webcomponent.md)
8. [Browsers support](#readme-browsers-support)
9. [Code linting](#readme-code-linting)
10. [Contribute](#readme-contribute)
11. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
12. [Licence](#readme-license)

<a name="readme-install"></a>

## Install

```
npm install coffeekraken-s-donut-component --save
```

<a name="readme-get-started"></a>

## Get Started

First, import the component into your javascript file like so:

```js
import SDonutComponent from "coffeekraken-s-donut-component"
```

Then simply use it inside your html like so:

```html
<s-donut segments="[{start:0,end:60}]">
  <span class="anything-you-want">60%</span>
  <!-- anything you want here... -->
</s-donut>
```

<a id="readme-segments"></a>
## Segments

The main principle of this webcomponent are the segments. You can register multiple segments by donut. Each segments can/must have:

- `name`: **required** A name for the segment. Used in some api function
- `start`: **required** The start value of the segment between 0 and 100
- `end`: **required** The end value of the segment between 0 and 100
- `color`: **optional** The color for the segment. Otherwise it will be `currentColor`
- `animate`: **optional** If want the segment to be animated of not. Default `true`

To define a segment for a donut, use the `segments` property like so:

```html
<s-donut segments="[{name:'1',start:0,end:30},{name:'2',start:30,end:70,color:'#ff0000'}]"></s-donut>
```

<a id="readme-api"></a>
## API

Each donut comes with his own API. Here's the functions available:

### `addSegment(start, end, color="currentColor", name="default", animate=true): SDonutComponent`

Add a segment to the donut.

### `setSegmentAnimate(animate, name="default"): SDonutComponent`

Specify if the provided segment need to be animated or not

### `setSegmentOpacity(opacity, name="default"): SDonutComponent`

Specify the provided segment opacity

### `setSegmentStrokeWidth(width, name="default"): SDonutComponent`

Specify the provided segment stroke width

### `setSegmentColor(color, name="default"): SDonutComponent`

Specify the provided segment color

### `setSegmentValues(start, end, name="default"): SDonutComponent`

Specify the provided segment values

### `getSegmentByName(name): SVGCircleElement`

Return the `circle` element representing the segment

<a id="readme-browsers-support"></a>

## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11+                                                                                                                                                              | last 2 versions                                                                                                                                                   | last 2 versions                                                                                                                                                | last 2 versions                                                                                                                                                |

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-code-linting"></a>

## Code linting

This package uses some code linting rules. Here's the list:

1. [ESLint](https://eslint.org/) with [airbnb](https://www.npmjs.com/package/eslint-config-airbnb) and [prettier](https://github.com/prettier/eslint-config-prettier) rules for javascript files
2. [Stylelint](https://github.com/stylelint/stylelint) with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) for `scss` files

> Your commits will not been accepted if the code style is not respected!

<a id="readme-contribute"></a>

## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>

## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>

## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
