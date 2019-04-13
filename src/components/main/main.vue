<template>
    <div class="main">
    <router-link class="btn" :to="{path:'/book',query: {flag: 0}}">我要购买</router-link>
    <router-link class="btn" :to="{path:'/book',query: {flag: 1}}">我要发布</router-link>
    </div>
</template>

<script>
    export default {
        name: "linkhome"
    }
</script>

<style scoped>

</style>
