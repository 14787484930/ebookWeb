import Vue from 'vue'
import { pageScroll } from '../assist'
import confirm from './confirm.vue'

const ConfirmConstructor = Vue.extend(confirm)

const instance = new ConfirmConstructor({
  el: document.createElement('div')
})

const hashChange = function () {
  pageScroll.unlock()

  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)
}

ConfirmConstructor.prototype.closeConfirm = function (stay, callback) {
  let stopClose = true

  if (typeof callback === 'function') {
    stopClose = callback()
    if (stopClose === undefined) stopClose = true
  }

  if (!stopClose || stay) return

  pageScroll.unlock()

  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)

  window.removeEventListener('hashchange', hashChange)
}

const Confirm = (options = {}) => {
  instance.msg = options.msg || ''
  instance.title = options.title || '提示'
  instance.callback = options.callback

  window.addEventListener('hashchange', hashChange)

  document.body.appendChild(instance.$el)

  pageScroll.lock()
}

export default Confirm
