import { get, post } from './helpers'

// const getSeller = get('user/getById')
// const getGoods = get('api/goods')
// const getRatings = get('api/ratings')

// 测试
const getGoodsTest = get('/good/goods')
const getGoodsListTest = get('/order/orders')
const getOrderListTest = get('/order/getDetailed')
const PostGoodsTest = post('order/save')

export {
  getGoodsTest,
  getGoodsListTest,
  getOrderListTest,
  PostGoodsTest
}
