<template>
  <div class="js_dialog">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd" v-html="msg"></div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary dialog-btn"
           @click.stop="closeAlert">确定</a>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    title: String,
    msg: String,
    callback: Function
  }
}
</script>

<style>

</style>
