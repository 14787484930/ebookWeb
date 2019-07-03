<template>
  <section class="container">
    <h1>请选择</h1>
    <router-link class="btn" :to="{path:'/book',query: {flag: 0}}">我要购买</router-link>
    <router-link class="btn" :to="{path:'/book',query: {flag: 1}}">我要发布</router-link>
    <router-link class="btn" :to="{path:'/version'}">关于我们</router-link>
    <router-link class="btn" :to="{path:'/advice'}">提供建议</router-link>
    <router-link class="btn" :to="{path:'/verify'}">学生身份校验</router-link>
    <router-link class="btn" :to="{path:'/shop'}">商城测试</router-link>
    <router-link class="btn" :to="{path:'/shopSeller'}">商城测试(商家)</router-link>
    <router-link class="btn" :to="{path:'/registerShop'}">商家注册</router-link>
    <router-link class="btn" :to="{path:'/selectBuilding'}">选择楼栋</router-link>
  </section>
</template>

<script>
  export default {
    name: 'linkhome',
    data() {
      return {
        test: {
          a: null,
          b: 1
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    text-align: center;
  }

  h1 {
    margin-top: 5vh;
    margin-bottom: 10vh;
  }

  .btn {
    display: inline-block;
    padding: 10px;
    margin: 10px;
    background-color: lightblue;
    border-radius: 5px;
  }
</style>
