<template>
  <!--  <div class="js_dialog">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title?title:'提示'}}</strong></div>
        <div class="weui-dialog__bd">{{msg}}</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary dialog-btn"
             @click.stop="closeAlert">确定</a>
        </div>
      </div>
    </div>-->
  <div class="js_dialog">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd" v-html="msg"></div>
      <div class="weui-dialog__ft">
        <a href="javascript:;"
           class="weui-dialog__btn weui-dialog__btn_default ok-btn"
           @click.stop="closeConfirm(false)">取消</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary cancel-btn"
           @click.stop="closeConfirm(false,callback)">确定</a>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    title: String,
    msg: String,
    callback: {
      type: [Array, Function],
      default: () => {
      }
    }
  }
}
</script>

<style>

</style>
