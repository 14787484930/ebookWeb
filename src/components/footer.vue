<!--页脚组件-->
<template lang="html">
  <panel title="" :class="$style.panel">
    <ul :class="$style.content">
      <li>
        <img
            src="//img12.360buyimg.com/jrpmobile/jfs/t2842/350/3035567089/14791/5f6ff93d/577cf395N31e76288.png?width=1125&height=252"
            alt="">
      </li>
      <li>Copyright © 2019-2020 E书版权所有</li>
    </ul>
  </panel>
</template>

<script>
  import panel from '../components/core/panel'

  export default {
    components: {
      panel
    }
  }
</script>

<style lang="scss" module>
  @import "../assets/scss/element";

  .panel {
    @include panel;
    & > h4 {
      display: none;
    }
    .content {
      @include flex;
      background: #F5F5F5;
      li {
        color: lightblue;
        text-align: center;
        font-size: 12px;
        width: 100%;
        > img {
          width: 100%;
        }
      }
    }
  }
</style>
