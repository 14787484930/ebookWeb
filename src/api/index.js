import { get } from './helpers'

const getSeller = get('user/getById')
const getGoods = get('api/goods')
const getRatings = get('api/ratings')

// 测试
const getSellerTest = get('api/seller')
const getGoodsTest = get('api/goods')
const getRatingsTest = get('api/ratings')

export {
  getSellerTest,
  getSeller,
  getGoods,
  getRatings
}
