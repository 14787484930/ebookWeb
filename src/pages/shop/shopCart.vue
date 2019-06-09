<template>
  <div style="text-align: center">
    <h1>Example</h1>
    <hr>
    <h3>Products</h3>
    <div>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price }}
          <br>
          <button :disabled="!product.inventory" @click="addProductToCart(product)">
            Add to cart
          </button>
        </li>
      </ul>
    </div>
    <hr>
    <h3>Your Cart</h3>
    <div>
      <p v-show="!cartProducts.length">
        <i>Please add some products to cart.</i>
      </p>
      <ul>
        <li v-for="product in cartProducts" :key="product.id">
          {{ product.title }} - {{ product.price }} x {{ product.quantity }}
        </li>
      </ul>
      <p>Total: {{ total }}</p>
      <p>
        <button :disabled="!cartProducts.length" @click="checkout(cartProducts)">Checkout</button>
      </p>
      <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    created() {
      this.$store.dispatch('products/getAllProducts')
    },
    computed: {
      ...mapState({
        products: state => state.products.all,
        checkoutStatus: state => state.cart.checkoutStatus
      }),
      ...mapGetters('cart', {
        cartProducts: 'cartProducts',
        total: 'cartTotalPrice'
      }),
      ...mapActions('cart', [
        'addProductToCart'
      ])
    },
    methods: {
      checkout(products) {
        this.$store.dispatch('cart/checkout', products)
      }
    }
  }
</script>
