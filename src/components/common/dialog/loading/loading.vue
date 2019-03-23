<template>
  <div>
    <div class="module-alert" id='dialog-div'>
      <div class="weui-mask_transparent"></div>
      <div class="toast_waiting" v-html="title"></div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    title: String
  }
}
</script>
