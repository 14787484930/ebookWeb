import Vue from 'vue'
// 引入外部js
import Hammer from 'hammerjs'

function VueTouch(el, type, binding) {
  this.el = el;
  this.type = type;
  this.binding = binding;
  // 直接调用
  const hammertime = new Hammer(this.el);
  hammertime.on(this.type, this.binding.value);
}

// 包装成指令
const tap = Vue.directive('tap', {
  bind: function (el, binding) {
    new VueTouch(el, 'tap', binding);
  }
});

const swipeleft = Vue.directive('swipeleft', {
  bind: function (el, binding) {
    new VueTouch(el, 'swipeleft', binding);
  }
});

const swiperight = Vue.directive('swiperight', {
  bind: function (el, binding) {
    new VueTouch(el, 'swiperight', binding);
  }
});

const press = Vue.directive('press', {
  bind: function (el, binding) {
    new VueTouch(el, 'press', binding);
  }
});
const swipedown = Vue.directive('swipedown', {
  bind: function (el, binding) {
    new VueTouch(el, 'swipedown', binding);
  }
});
const pandown = Vue.directive('pandown', {
  bind: function (el, binding) {
    new VueTouch(el, 'pandown', binding);
  }
});
const swipeup = Vue.directive('swipeup', {
  bind: function (el, binding) {
    new VueTouch(el, 'swipeup', binding);
  }
});
const panup = Vue.directive('panup', {
  bind: function (el, binding) {
    new VueTouch(el, 'panup', binding);
  }
})
// 导出需要的指令
export { tap, swipeleft, swiperight, press, swipedown, pandown, swipeup, panup }
