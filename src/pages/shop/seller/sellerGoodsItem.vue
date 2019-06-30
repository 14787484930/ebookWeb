<template>
  <div>
    <h1 class="headerClass">商品列表</h1>
    <grid-view :grid='grid' url='/good/goods'></grid-view>
    <transition name='router-slid' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import gridView from '../../../components/gridView'

  export default {
    name: 'ShopSeller',
    components: {
      gridView
    },
    data() {
      return {
        msg: '商品列表',
        grid: {},
        queryList: {
          supperId: 11  // 小卖铺标记（对应用户id）
        }
      }
    },
    created() {
      this.initGrid();
    },
    methods: {
      initGrid() {
        this.grid = {
          img: 'goodPic',
          query: this.queryList,
          del: this.del,
          edit: this.update,
          columns: [
            { title: '名称', key: 'goodName' },
            { title: '价格', key: 'goodPrice', format: this.setPrice }
          ]
        }
      },
      setPrice(row) {
        return '￥' + row.goodPrice;
      },
      del(row, callback) {
        const para = { id: row.id }
        this.$post('/good/delete', para, (msg) => {
          this.$createDialog({
            type: 'alert',
            title: '信息',
            content: '删除成功 ',
            icon: 'cubeic-right',
            onConfirm: () => {
              callback(msg.data.code)
            }
          }).show()
        })
      },
      update(row) {
        this.$router.push({ name: 'dealGoods', query: { id: row.id }})
      }
    }
  }
</script>

<style>
  .headerClass {
    text-align: center;
    vertical-align: middle;
  }
</style>
