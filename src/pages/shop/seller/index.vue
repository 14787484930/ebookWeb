<!--底部导航栏-->
<template>
  <section>

    <div class='tabs tabs-icon-top fixed-bottom'>
      <router-link class='tab-item' v-for='(item) in config' :key='item.url' tag='li' :to='{path:item.url}'>
        <i v-if='item.list.indexOf($route.path)!==-1' :class="['icon',item.iClass]" style='color:#379be9'></i>
        <i v-else :class="['icon',item.iOutClass]"></i>
        {{item.text}}
      </router-link>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        seleted: 'itemList',
        config: [
          {
            url: '/itemList',
            text: '我的商品',
            iClass: 'ion-ios-bookmarks',
            iOutClass: 'ion-ios-bookmarks-outline',
            list: ['/itemList', '/dealGoods']
          },
          {
            url: '/dealGoods',
            text: '新增商品',
            iClass: 'ion-ios-gear',
            iOutClass: 'ion-ios-gear-outline',
            list: ['/dealGoods', '/itemList']
          }
        ]
      }
    }
  }
</script>

<style lang='scss' scoped>
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }
</style>
