import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import home from '../../components/main/home'
import  book from '../../components/book/index'
import  electronics from '../../components/electronics/index'
import  teach from '../../components/teach/index'
import  other from '../../components/other/index'
import bookAdd from '../../components/book/add'
import bookView from '../../components/book/view'
const routes = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/', component: home,
            children: [
                {path: '/book', component: book},
                {path: '/bookAdd', component: bookAdd},
                {path:'/bookView',component:bookView},
                {path: '/electronics', component: electronics},
                {path: '/teach', component: teach},
                {path: '/other', component: other},
            ],
        }
    ]
})
export  default  routes;
