import Vue from 'vue'
import App from './App.vue'
import router from './webserver/router/router'
import store from './store/store' // 引入store
import './frame/amfe-flexible'// 移动端布局
import './frame/cube-ui' // 引入cube-ui
import './assets/ionic/css/ionic.min.css'
import './assets/css/style.css'
import './webserver/serve/serve'
import './webserver/serve/picker'
import './webserver/serve/touch'
import './register'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
