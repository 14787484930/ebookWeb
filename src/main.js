import Vue from 'vue'
import App from './App.vue'
import router from './webserver/router/router'
import store from './store/store' //引入store

import 'amfe-flexible'
import './assets/ionic/css/ionic.min.css'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/style.css'
import './webserver/serve/serve'
import './webserver/serve/picker'
import './webserver/serve/touch'

import './frame/cube-ui'

import weui from 'weui'

Vue.prototype.$weui = weui

import iView from 'iview'

Vue.use(iView)

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        window.document.title = "西林易市"
    }
}).$mount('#app')
