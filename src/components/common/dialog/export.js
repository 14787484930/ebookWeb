import dialog from './index'

window.document.addEventListener('touchstart', function (event) {
  /* Do Nothing */
}, false)

const install = function (Vue) {
  Vue.prototype.$dialog = {
    confirm: dialog.confirm,
    alert: dialog.alert
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
