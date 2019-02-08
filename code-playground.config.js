module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-donut-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
      <s-donut id="donut1" segments="[{start:0,end:90}]">
        <s-characters-slideshow timeout="0" loop="false" values="['90%']" class="donut__value">90%</s-characters-slideshow>
        <span class="donut__title">Somthing cool</span>
      </s-donut>

      <s-donut id="donut2" segments="[{start:0,end:90}]"
        stroke-width="40">
        <s-characters-slideshow timeout="0" loop="false" values="['90%']" class="donut__value">90%</s-characters-slideshow>
        <span class="donut__title">Somthing cool</span>
      </s-donut>

      <s-donut id="donut3" segments="[{start:0,end:90}]"
        stroke-width="30">
        <s-characters-slideshow timeout="0" loop="false" values="['90%']" class="donut__value">90%</s-characters-slideshow>
        <span class="donut__title">Somthing cool</span>
      </s-donut>

      <s-donut
        id="donut4"
        stroke-width="50"
        animation-duration="500"
        segments="[{name:'1',start:0,end:30,color:'#f2bc2b'}, {name:'2',start:30,end:70,color:'#2b3438'}, {name:'3',start:70,end:100,color:'#848e91'}]"
      >
        <span class="donut__value">XX</span>
        <span class="donut__title">Somthing cool</span>
      </s-donut>
      `
    },
    css: {
      language: "scss",
      data: `
        @import 'node_modules/coffeekraken-sugar/index';
        @import 'node_modules/coffeekraken-s-typography-component/index';
        @include s-init();
        @include s-classes();
        @include s-typography-classes();
        body {
          padding: s-space(bigger);
        }
        s-donut {
          width: s-rem(250px);
          height: s-rem(250px);
          margin: s-space(default);
        }
        #donut1 {
          color: s-color(default)
        }
        #donut2 {
          color: s-color(primary)
        }
        #donut3 {
          color: s-color(secondary)
        }
          .donut__value {
            font-size: s-rem(60px);
            display: block;
          }
      `
    },
    js: {
      language: "js",
      data: `
      import SCharactersSlideshow from 'coffeekraken-s-characters-slideshow-component'
        import SDonutComponent from './dist/index'
        class Donut {
          constructor($donut) {
            this._$donut = $donut
            this._value = $donut.querySelector("s-characters-slideshow")
          }
          setValue(percent) {
            this._value.switch(this._value.innerHTML, percent + '%')
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
      `
    }
  }
}
