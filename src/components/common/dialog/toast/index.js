import Vue from 'vue'
import { pageScroll } from '../assist'
import toast from './toast.vue'

const ToastConstructor = Vue.extend(toast)

const instance = new ToastConstructor({
  el: document.createElement('div')
})

ToastConstructor.prototype.closeToast = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)

  pageScroll.unlock()

  typeof this.callback === 'function' && this.callback()
}

const Toast = (options = {}) => {
  instance.msg = options.msg
  instance.icon = options.icon || 'success'
  instance.timeout = ~~options.timeout || 2000
  instance.callback = options.callback

  document.body.appendChild(instance.$el)
  pageScroll.lock()
  const timer = setTimeout(() => {
    clearTimeout(timer)
    instance.closeToast()
  }, instance.timeout + 100)
}

export default Toast
