import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from './pages/shop/header-detail/header-detail'
import ShopCartList from './pages/shop/shop-cart-list/shop-cart-list'
import ShopCartStikcy from './pages/shop/shop-cart-sticky/shop-cart-sticky'
import Food from './pages/shop/food/food'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartStikcy)
createAPI(Vue, Food)
