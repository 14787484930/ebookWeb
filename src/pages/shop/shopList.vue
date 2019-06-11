<template>
  <div>
    <h1 class="headerClass">商店列表</h1>
    <grid-view :grid='grid' url='/user/getsuperMarkets'></grid-view>
    <transition name='router-slid' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import gridView from '../../components/gridView'

  export default {
    name: 'Shop',
    components: {
      gridView
    },
    data() {
      return {
        msg: '商店',
        grid: {},
        queryList: {
          buildingNum: 11
        }
      }
    },
    created() {
      console.log(this.queryList.flag)
      this.queryList.flag = this.$toInt(this.$route.query.flag);
      this.$store.commit('setFlag', this.$toInt(this.$route.query.flag));
      this.initGrid();
    },
    methods: {
      initGrid() {
        this.grid = {
          query: this.queryList,
          view: this.view,
          columns: [
            { title: '商店名称', key: 'superMarketName' },
            { title: '楼栋', key: 'buildingNumber' }
          ]
        }
      },
      view(row) {
        this.$router.push({ name: 'goodsList', query: { id: row.id, name: row.superMarketName}});
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
