<template>
  <div id="app" @touchmove.prevent>
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
  import qs from 'query-string'
  // import { getSellerTest } from '../../api'
  import VHeader from './v-header/v-header'
  import Goods from './goods/goods'
  // import Ratings from './ratings/ratings'
  // import Seller from './seller/seller'
  import Tab from './tab/tab'

  export default {
    data() {
      return {
        seller: {
          id: qs.parse(location.search).id,
          name: qs.parse(location.search).name,
          deliveryPrice: 0,
          minPrice: 0
        }
      }
    },
    computed: {
      tabs: function () {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller
            }
          }
          // {
          //   label: '评论',
          //   component: Ratings,
          //   data: {
          //     seller: this.seller
          //   }
          // },
          // {
          //   label: '商家',
          //   component: Seller,
          //   data: {
          //     seller: this.seller
          //   }
          // }
        ]
      }
    },
    created() {
      this._getSeller()
    },
    methods: {
      _getSeller() {
        const seller = {
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg'
        }
        // Object.assign 可以把 n 个源对象拷贝到目标对象中去
        this.seller = Object.assign({}, this.seller, seller)
      }
    },
    components: {
      Tab,
      VHeader
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
