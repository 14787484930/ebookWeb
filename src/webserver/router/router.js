import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//修改路由为懒加载 -by gpj
const home = r => require.ensure([], () => r(require('../../pages/main/home')), 'home')
const main = r => require.ensure([], () => r(require('../../pages/main/main')), 'home')
const book = r => require.ensure([], () => r(require('../../pages/book/index')), 'book')
const bookAdd = r => require.ensure([], () => r(require('../../pages/book/add')), 'book')
const bookView = r => require.ensure([], () => r(require('../../pages/book/view')), 'book')
const electronics = r => require.ensure([], () => r(require('../../pages/electronics/index')), 'electronics')
const electronicsAdd = r => require.ensure([], () => r(require('../../pages/electronics/add')), 'electronics')
const electronicsView = r => require.ensure([], () => r(require('../../pages/electronics/view')), 'electronics')
const teach = r => require.ensure([], () => r(require('../../pages/teach/index')), 'teach')
const teachAdd = r => require.ensure([], () => r(require('../../pages/teach/add')), 'teach')
const teachView = r => require.ensure([], () => r(require('../../pages/teach/view')), 'teach')
const other = r => require.ensure([], () => r(require('../../pages/other/index')), 'other')
const otherAdd = r => require.ensure([], () => r(require('../../pages/other/add')), 'other')
const otherView = r => require.ensure([], () => r(require('../../pages/other/view')), 'other')
const center = r => require.ensure([], () => r(require('../../pages/about/mycenter')), 'center')
const advice = r => require.ensure([], () => r(require('../../pages/about/advice')), 'center')
const version = r => require.ensure([], () => r(require('../../pages/about/version')), 'center')
//测试模块
const verify = r => require.ensure([], () => r(require('../../components/verify')), 'verify')
const shop = r => require.ensure([], () => r(require('../../pages/shop/index')), 'shop')
const report = r => require.ensure([], () => r(require('../../pages/common/report')), 'shop')
const editor = r => require.ensure([], () => r(require('../../pages/common/editor')), 'editor')

/*
//打包app不能使用懒加载，后面找原因
import home from '../../pages/main/home'
import main from '../../pages/main/main'
import book from '../../pages/book/index'
import electronics from '../../pages/electronics/index'
import electronicsAdd from '../../pages/electronics/add'
import electronicsView from '../../pages/electronics/view'
import teach from '../../pages/teach/index'
import teachAdd from '../../pages/teach/add'
import teachView from '../../pages/teach/view'
import other from '../../pages/other/index'
import otherAdd from '../../pages/other/add'
import otherView from '../../pages/other/view'
import bookAdd from '../../pages/book/add'
import bookView from '../../pages/book/view'
import center from '../../pages/about/mycenter'
import advice from '../../pages/about/advice'
import version from '../../pages/about/version'
//测试模块
import shop from '../../pages/shop/index'
import verify from '../../components/verify'*/

const routes = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    base: '/',
    routes: [
        // 动态路径参数 以冒号开头
        {
            path: '/', name: '首页', component: home,
            children: [
                {path: '/', name: '', component: main},
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
                //{path: '*', name: '*', component: main},
            ],
        },
        // 动态路径参数 以冒号开头
        {
            path: '/shop', name: '首页', component: home,
            children: [
                {path: 'shop', name: 'shop', component: shop}
            ],
        },
        {
            //举报页面
            path: '/report',name:'report', component: report
        },
        {
            //富文本编辑页
            path:'/editor', name:'editor', component: editor
        }

    ]
})
export default routes;
