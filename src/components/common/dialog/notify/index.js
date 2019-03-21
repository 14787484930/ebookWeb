import Vue from 'vue'
import notify from './notify'

const NotifyConstructor = Vue.extend(notify)

const instance = new NotifyConstructor({
  el: document.createElement('div')
})

let timer = null
let lock = false

NotifyConstructor.prototype.closeNotify = function () {
  setTimeout(() => {
    const el = instance.$el
    el.parentNode && el.parentNode.removeChild(el)
    lock = false
  }, 150)
  typeof this.callback === 'function' && this.callback()
}

const Notify = (options = {}) => {
  instance.type = options.type || 'success'
  instance.msg = options.msg
  instance.timeout = ~~options.timeout || 3000
  instance.callback = options.callback

  if (lock) return
  lock = true

  document.body.appendChild(instance.$el)

  instance.$el.addEventListener('click', () => {
    clearTimeout(timer)
    instance.closeNotify()
  })

  timer = setTimeout(() => {
    clearTimeout(timer)
    instance.closeNotify()
  }, instance.timeout)
}

export default Notify
