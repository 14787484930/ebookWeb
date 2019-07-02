<template>
  <cube-scroll class="list-content">
    <div class='item item-avatar'>
      <img src='../../assets/images/timg.jpg'>
      <h2 style='margin-top:11px;'>昵称：{{ userinfo.nickName }}</h2>
    </div>

    <div class='item'>
      <span>零食购物清单</span>
      <ul class='shop_item'>
        <li v-for="(item, index) in list" :key="index">
          <div style="margin: 20px 0" @click.stop="showAlert(item.id)">
            <span>订单号：{{item.id}}</span>
            <div v-if="isOpend == item.id">
              <div style="margin: 15px 20px" v-for="(food,index) in orderFood" :key="index">
                <img :src="$file(food.goodPic)" style="width: 50px; height: 50px"/>
                <span style="float: right;vertical-align: middle">￥{{food.goodPrice}}*{{food.buyNumber}}</span>
                <span style="float: right;margin: 0 50px; vertical-align: middle">{{food.goodName}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <footor></footor>
  </cube-scroll>

</template>

<script>
  import panel from '../../components/core/panel'
  import footor from '../../components/footer'
  import { getGoodsListTest, getOrderListTest } from '../../api'

  export default {
    name: 'mycenter',
    components: {
      panel,
      footor
    },
    data() {
      return {
        userinfo: {
          nickName: 'vxiao',
          userId: this.$store.getters.getUserId,
          itemList: null
        },
        list: [],
        orderFood: [],
        isOpend: null
      }
    },
    methods: {
      showAlert(id) {
        if (this.isOpend === id) {
          this.isOpend = null
          return
        }
        // 查看订单详情
        getOrderListTest({
          id: id,
          pageNumber: 1,
          pageSize: 200
        }).then((goods) => {
          this.orderFood = goods.listinfo[0].goods
        })
        this.isOpend = id
      }
    },
    created() {
      // 加载订单列表
      getGoodsListTest({
        createUser: this.userId,
        pageNumber: 1,
        pageSize: 200
      }).then((goods) => {
        this.list = goods.pageInfo.list
        console.log(this.list)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list-content
    overflow: hidden

  .item > span
    color: lightblue
    .shop_item
      margin: 5px 0

</style>
