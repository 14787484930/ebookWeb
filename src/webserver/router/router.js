import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 修改路由为懒加载 -by gpj
/* const main = r => require.ensure([], () => r(require('../../pages/main/main')), 'home')
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
const center = r => require.ensure([], () => r(require('../../pages/about/index')), 'center')
const advice = r => require.ensure([], () => r(require('../../pages/about/advice')), 'center')
const version = r => require.ensure([], () => r(require('../../pages/about/version')), 'center')
//测试模块
const verify = r => require.ensure([], () => r(require('../../components/verify')), 'verify')
const shop = r => require.ensure([], () => r(require('../../pages/shop/index')), 'shop')
const report = r => require.ensure([], () => r(require('../../pages/common/report')), 'shop')
const editor = r => require.ensure([], () => r(require('../../pages/common/editor')), 'editor')
const personal = r => require.ensure([], () => r(require('../../pages/about/personal')), 'personal')*/
// 打包app不能使用懒加载，后面找原因
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
import personal from '../../pages/about/personal'
import center from '../../pages/about/index'
import advice from '../../pages/about/advice'
import version from '../../pages/about/version'
import report from '../../pages/common/report'
import editor from '../../pages/common/editor'

// 测试模块
import shop from '../../pages/shop/shopHome'
import shopTest from '../../pages/shop/index'
import shopList from '../../pages/shop/shopList'
import shopCart from '../../pages/shop/shopCart'
import shopCenter from '../../pages/shop/shopCenter'
import productList from '../../pages/shop/goodsList'

import verify from '../../components/verify'

const routes = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: '/',
  routes: [
    {
      path: '',
      redirect: '/main'
    },
    {
      path: '/main',
      component: main
    },
    {
      path: '/home',
      component: home,
      children: [
        // 图书
        {
          path: '/book',
          component: book,
          children: [
            { path: 'bookAdd', name: 'bookAdd', component: bookAdd },
            { path: 'bookView', name: 'bookView', component: bookView }
          ]
        },
        // 电子
        {
          path: '/electronics',
          component: electronics,
          children: [
            { path: 'electronicsAdd', name: 'electronicsAdd', component: electronicsAdd },
            { path: 'electronicsView', name: 'electronicsView', component: electronicsView }
          ]
        },
        // 其他
        {
          path: '/other',
          component: other,
          children: [
            { path: 'otherAdd', name: 'otherAdd', component: otherAdd },
            { path: 'otherView', name: 'otherView', component: otherView }
          ]
        },
        // 辅导
        {
          path: '/teach',
          component: teach,
          children: [
            { path: 'teachAdd', name: 'teachAdd', component: teachAdd },
            { path: 'teachView', name: 'teachView', component: teachView }
          ]
        },
        // 个人中心
        {
          path: '/center', component: center
        }
      ]
    },
    // 提供建议
    { path: '/advice', name: 'advice', component: advice },
    // 关于我们
    { path: '/version', name: 'version', component: version },
    // 商城
    {
      path: '/shop', name: 'shop', component: shop,
      children: [
        // 测试
        { path: '/shopTest', name: 'shopTest', component: shopTest },
        // 小卖部列表
        { path: '/shopList', name: 'shopList', component: shopList },
        // 商品列表
        { path: '/productList', name: 'productList', component: productList },
        // 我的购物车
        { path: '/shopCart', name: 'shopCart', component: shopCart },
        // 个人中心
        { path: '/shopCenter', name: 'shopCenter', component: shopCenter }
      ]
    },
    // 举报页面
    { path: '/report', name: 'report', component: report },
    // 富文本编辑页
    { path: '/editor', name: 'editor', component: editor },
    // 当前选择学校页
    { path: '/verify', name: 'verify', component: verify },
    { path: '/personal', name: 'personal', component: personal }
  ]
})
export default routes;
