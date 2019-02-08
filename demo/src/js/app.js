import "babel-polyfill"
import "coffeekraken-sugar/js/features/all"
import SCharactersSlideshow from "coffeekraken-s-characters-slideshow-component"
import SDonutComponent from "../../../dist/index"

class Donut {
  constructor($donut) {
    this._$donut = $donut
    this._value = $donut.querySelector("s-characters-slideshow")
  }
  setValue(percent) {
    this._value.switch(this._value.innerHTML, `${percent}%`)
    this._$donut.setSegmentValues(0, percent)
  }
}

class ComplexeDonut {
  constructor($donut) {
    this._$donut = $donut
    this._value = $donut.querySelector("s-characters-slideshow")
  }
  setValue(percent1, percent2, percent3) {
    this._$donut.setSegmentValues(0, percent1, "1")
    this._$donut.setSegmentValues(percent1, percent2, "2")
    this._$donut.setSegmentValues(percent2, percent3, "3")
  }
}

const donut1 = new Donut(document.querySelector("#donut1"))
const donut2 = new Donut(document.querySelector("#donut2"))
const donut3 = new Donut(document.querySelector("#donut3"))
const donut4 = new ComplexeDonut(document.querySelector("#donut4"))

setInterval(() => {
  donut1.setValue(Math.round(Math.random() * 100))
  donut2.setValue(Math.round(Math.random() * 100))
  donut3.setValue(Math.round(Math.random() * 100))

  donut4.setValue(
    Math.round(Math.random() * 33),
    33 + Math.round(Math.random() * 33),
    66 + Math.round(Math.random() * 33)
  )
}, 2000)
