<template>
    <section class="container">
        <h1>请选择</h1>
        <router-link class="btn" :to="{path:'/book',query: {flag: 0}}">我要购买</router-link>
        <router-link class="btn" :to="{path:'/book',query: {flag: 1}}">我要发布</router-link>
    </section>
</template>

<script>
    export default {
        name: "linkhome"
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
        height: 10vh;
        width: 50%;
        font-size: 5vh;
        margin: 3vw;
        background-color: lightblue;
        border-radius: 10px;
    }
</style>
