import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import home from '../../components/main/home'
import  book from '../../components/book/index'
import electronics from '../../components/electronics/index'
import electronicsAdd from '../../components/electronics/add'
import electronicsView from '../../components/electronics/view'
import teach from '../../components/teach/index'
import teachAdd from '../../components/teach/add'
import teachView from '../../components/teach/view'
import other from '../../components/other/index'
import otherAdd from '../../components/other/add'
import otherView from '../../components/other/view'
import bookAdd from '../../components/book/add'
import bookView from '../../components/book/view'
import center from '../../components/about/mycenter'
import advice from '../../components/about/advice'
import version from '../../components/about/version'
// import test from '../../components/about/test'
import verify from '../../components/common/verify'

const routes = new VueRouter({
    linkActiveClass: 'active',
    routes: [
        // 动态路径参数 以冒号开头

        { path: '/', component: home,
            children: [
                {path: '/', component: book},
                {path: '/book', component: book},
                {path: '/bookAdd', component: bookAdd},
                {path:'/bookView',component:bookView},
                {path: '/electronics', component: electronics},
                {path: '/electronicsAdd', component: electronicsAdd},
                {path: '/electronicsView', component: electronicsView},
                {path: '/teach', component: teach},
                {path: '/teachAdd', component: teachAdd},
                {path: '/teachView', component: teachView},
                {path: '/other', component: other},
                {path: '/otherAdd', component: otherAdd},
                {path: '/otherView', component: otherView},
                {path: '/about', component: center},
                {path: '/advice', component: advice},
                // {path: '/test', component: test},
                {path: '/version', component: version},
                {path: '/verify', component: verify},
            ],
        }
    ]
})
export  default  routes;
