<template>
  <div>
    <div id='dialog-div'>
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i :class="'weui-icon_toast toast_'+icon"></i>
        <p class="weui-toast__content">{{msg}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    msg: String,
    icon: String,
    timeout: Number,
    callback: Function
  }
}
</script>
