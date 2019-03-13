<template>
    <div style="padding-bottom:.2rem;">
        <div class="page-head">
            <p>
                <a href="javascript:;" v-on:click="historyGo()" class="back"></a>
                {{headName}}<a href="/" class="home"></a>
            </p>
            <div class="head-blank"></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'HomeHeader',
  props: ['headName'],
  data () {
    return {}
  },
  components: {},
  methods: {
    historyGo: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
/*page-head*/
.page-head { background:#232529; height: 1.07rem; line-height: 0.88rem; color:#fff; font-size: 0.32rem; position: relative; padding: 0 0.45rem ; text-align: center; overflow: hidden;  }
.page-head .back { width: 0.17rem; height: 0.32rem; position: absolute; left: 0.3rem; top: 0.4rem; background: url("../../assets/images/head-back.png") center no-repeat; background-size: contain; }
</style>
