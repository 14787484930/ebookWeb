<template>
    <div id="app">
        <router-view></router-view>
        <h1>Shopping Cart Example</h1>
        <hr>
        <h2>Products</h2>
        <ProductList/>
        <hr>
        <ShoppingCart/>
    </div>
</template>

<script>
    import ProductList from './productList.vue'
    import ShoppingCart from './ShoppingCart.vue'
    export default {
        components: { ProductList, ShoppingCart }
    }
</script>
