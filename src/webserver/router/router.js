import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//修改路由为懒加载 -by gpj
const home = r => require.ensure([], () => r(require('../../page/main/home')), 'home')
const main = r => require.ensure([], () => r(require('../../page/main/main')), 'home')
const book = r => require.ensure([], () => r(require('../../page/book/index')), 'book')
const bookAdd = r => require.ensure([], () => r(require('../../page/book/add')), 'book')
const bookView = r => require.ensure([], () => r(require('../../page/book/view')), 'book')
const electronics = r => require.ensure([], () => r(require('../../page/electronics/index')), 'electronics')
const electronicsAdd = r => require.ensure([], () => r(require('../../page/electronics/add')), 'electronics')
const electronicsView = r => require.ensure([], () => r(require('../../page/electronics/view')), 'electronics')
const teach = r => require.ensure([], () => r(require('../../page/teach/index')), 'teach')
const teachAdd = r => require.ensure([], () => r(require('../../page/teach/add')), 'teach')
const teachView = r => require.ensure([], () => r(require('../../page/teach/view')), 'teach')
const other = r => require.ensure([], () => r(require('../../page/other/index')), 'other')
const otherAdd = r => require.ensure([], () => r(require('../../page/other/add')), 'other')
const otherView = r => require.ensure([], () => r(require('../../page/other/view')), 'other')
const center = r => require.ensure([], () => r(require('../../page/about/mycenter')), 'center')
const advice = r => require.ensure([], () => r(require('../../page/about/advice')), 'center')
const version = r => require.ensure([], () => r(require('../../page/about/version')), 'center')
//测试模块
const verify = r => require.ensure([], () => r(require('../../components/verify')), 'verify')
const shop = r => require.ensure([], () => r(require('../../page/shop/index')), 'shop')

const routes = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    base: '/',
    routes: [
        // 动态路径参数 以冒号开头
        {
            path: '/', name: '首页', component: home,
            children: [
                {path: '', name: '', component: main},
                {path: 'book', name: 'book', component: book},
                {path: 'bookAdd', name: 'bookAdd', component: bookAdd},
                {path: 'bookView', name: 'bookView', component: bookView},
                {path: 'electronics', name: 'electronics', component: electronics},
                {path: 'electronicsAdd', name: 'electronicsAdd', component: electronicsAdd},
                {path: 'electronicsView', name: 'electronicsView', component: electronicsView},
                {path: 'teach', name: 'teach', component: teach},
                {path: 'teachAdd', name: 'teachAdd', component: teachAdd},
                {path: 'teachView', name: 'teachView', component: teachView},
                {path: 'other', name: 'other', component: other},
                {path: 'otherAdd', name: 'otherAdd', component: otherAdd},
                {path: 'otherView', name: 'otherView', component: otherView},
                {path: 'about', name: 'about', component: center},
                {path: 'advice', name: 'advice', component: advice},
                {path: 'version', name: 'version', component: version},
                {path: 'verify', name: 'verify', component: verify},
                //404
                {path: '*', name: '*', component: book},
            ],
        },
        // 动态路径参数 以冒号开头
        {
            path: '/shop', name: '首页', component: home,
            children: [
                {path: 'shop', name: 'shop', component: shop}
            ],
        },
    ]
})
export default routes;
