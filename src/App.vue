<template>
  <div id="app">
    <keep-alive>
      <router-view name="default" ></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'app',
    watch:{
        $route(){
            window.location.reload();
        },
    },
}
</script>

