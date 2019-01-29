import Vue from 'vue'
import './cube-ui'
import  $ from 'jquery'
import App from './App.vue'
import  router from './webserver/router/router'
import 'amfe-flexible'
import './assets/ionic/css/ionic.min.css'
import './assets/bootstrap/css/bootstrap.min.css'
import  'weui'
import  './webserver/serve/serve'
import  './webserver/serve/picker'
Vue.config.productionTip = false
Vue.prototype.$=$
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
