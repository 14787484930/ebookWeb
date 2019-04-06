import Vue from 'vue'
import './frame/cube-ui'
import './frame/vue-quill-editor'
import  $ from 'jquery'
import App from './App.vue'
import  router from './webserver/router/router'
import 'amfe-flexible'
import './assets/ionic/css/ionic.min.css'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/style.css'
import  'weui'
import  './webserver/serve/serve'
import  './webserver/serve/picker'
import store from './webserver/serve/store'//引入store
import  {tap,swipeleft,swiperight,press,swipedown,pandown,swipeup,panup}  from './webserver/serve/touch'
//全局注册gridView
import gridViewCom from './components/common/gridView'
const gridView={
    install:function (myVue) {
        myVue.component('grid-view',gridViewCom)
    }
}
Vue.use(gridView)
import iView from 'iview';
Vue.use(iView);
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
    created(){
        window.document.title="西林易市"
    }
}).$mount('#app')
