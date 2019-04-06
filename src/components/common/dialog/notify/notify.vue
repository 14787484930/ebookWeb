<template>
  <!--<div class="yd-notify" :class="classes" v-html="mes"></div>-->
  <div :class="'weui-toptip '+classes" v-html="msg"></div>
</template>

<script type="text/babel">
const typeObject = {
  success: 'toptip_success',
  danger: 'toptip_cancel',
  warning: 'toptip_ban'
}
export default {
  data () {
    return {
      classes: ''
    }
  },
  props: {
    type: String,
    msg: String,
    timeout: Number,
    callback: Function
  },
  watch: {
    type (newValue) {
      this.classes = typeObject[newValue]
    }
  }
}
</script>
