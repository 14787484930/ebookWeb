<template>
    <div id="app">
        <keep-alive>
            <router-view name="default" :key="key"></router-view>
        </keep-alive>
    </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        userRole: { id: '' }    // 初始化userRole
      }
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
      }
    }
  }
</script>
