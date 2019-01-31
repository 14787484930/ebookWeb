import Vue from 'vue'
import './frame/cube-ui'
import './frame/vue-quill-editor'
import  $ from 'jquery'
import App from './App.vue'
import  router from './webserver/router/router'
import 'amfe-flexible'
import './assets/ionic/css/ionic.min.css'
import './assets/bootstrap/css/bootstrap.min.css'
import  'weui'
import  './webserver/serve/serve'
import  './webserver/serve/picker'
import  {tap,swipeleft,swiperight,press}  from './webserver/serve/touch'
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
