<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
          :side=true :data="goods"
          :options="scrollOptions" v-if="goods.length">
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
              direction="vertical"
              :labels="props.labels"
              :txts="barTxts"
              :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico v-if="props.txt.type>=1"
                             :size=3
                             :type="props.txt.type"></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>

        <cube-scroll-nav-panel key="热销榜" label="热销榜" title="热销榜">
          <ul>
            <!--<li @click="selectFood(food)"-->
            <li v-for="food in goods"
                :key="food.goodName"
                class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="$file(food.goodPic)">
              </div>
              <div class="content">
                <h2 class="name">{{food.goodName}}</h2>
                <p class="desc">{{food.des}}</p>
                <div class="price">
                  <span class="now">￥{{food.goodPrice}}</span>
                  <span class="old" v-show="food.goodPrice">￥{{food.goodPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>

    <!--购物车-->
    <div class="shop-cart-wrapper">
      <shop-cart
          ref="shopCart"
          :select-foods="selectFoods"
          :delivery-price="seller.deliveryPrice"
          :min-price="seller.minPrice"></shop-cart>
    </div>
  </div>
</template>

<script>
  import { getGoodsTest } from '../../../api'
  import CartControl from '../cart-control/cart-control'
  import ShopCart from '../shop-cart/shop-cart'
  import Food from '../food/food'
  import SupportIco from '../support-ico/support-ico'
  import Bubble from '../bubble/bubble'
  import '../../../webserver/serve/config.js'

  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        goods: [],
        selectedFood: {},
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller() {
        return this.data.seller
      },
      // 已选物品
      selectFoods() {
        const foods = []
        this.goods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
        return foods
      },
      // 侧边栏显示信息
      barTxts() {
        const ret = []
        // this.goods.forEach((good) => {
        //   const {type, name, foods} = good
        //   let count = 0
        //   foods.forEach((food) => {
        //     count += food.count || 0
        //   })
        //   ret.push({
        //     type,
        //     name,
        //     count
        //   })
        // })
        ret.push({
          'type': -1,
          'name': '热销榜',
          'count': 0
        })
        return ret
      }
    },
    methods: {
      fetch() {
        if (!this.fetched) {
          this.fetched = true
          getGoodsTest({
            supperId: this.seller.id,
            pageNumber: 1,
            pageSize: 200
          }).then((goods) => {
            this.goods = goods.pageInfo.list
          })
        }
      },
      selectFood(food) {
        this.selectedFood = food
        this._showFood()
        this._showShopCartSticky()
        console.log(food);
      },
      onAdd(target) {
        this.$refs.shopCart.drop(target)
      },
      _showFood() {
        this.foodComp = this.foodComp || this.$createFood({
          $props: {
            food: 'selectedFood'
          },
          $events: {
            add: (target) => {
              this.shopCartStickyComp.drop(target)
            },
            leave: () => {
              this._hideShopCartSticky()
            }
          }
        })
        this.foodComp.show()
      },
      _showShopCartSticky() {
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: this.seller.deliveryPrice,
            minPrice: this.seller.minPrice,
            fold: true
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartSticky() {
        this.shopCartStickyComp.hide()
      }
    },
    components: {
      Bubble,
      SupportIco,
      CartControl,
      ShopCart,
      Food
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/mixin"
  @import "../../../assets/stylus/variable"
  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
    >>> .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      overflow: hidden
    >>> .cube-scroll-nav-bar-item
      padding: 0 10px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: $fontsize-small
      background: $color-background-ssss
      .text
        flex: 1
        position: relative
      .num
        position: absolute
        right: -8px
        top: -10px
      .support-ico
        display: inline-block
        vertical-align: top
        margin-right: 4px
    >>> .cube-scroll-nav-bar-item_active
      background: $color-white
      color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid $color-col-line
      font-size: $fontsize-small
      color: $color-grey
      background: $color-background-ssss
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
        img
          height: auto
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .desc, .extra
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-light-grey
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: $fontsize-medium
            color: $color-red
          .old
            text-decoration: line-through
            font-size: $fontsize-small-s
            color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 0
        bottom: 12px
    .shop-cart-wrapper
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>
