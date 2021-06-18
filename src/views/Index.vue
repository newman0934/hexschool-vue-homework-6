<template>
<div class="container">
  <div class="row">
    <div class="card col-3" v-for="product of products" :key="product.id">
    <img :src="product.imageUrl" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <router-link class="btn btn-primary me-2" :to="{name:'product', params:{id:product.id}}">查看詳情</router-link>
      <button type="button" class="btn btn-secondary" @click="addToCart(product.id)">加入購物車</button>
    </div>
  </div>
  </div>
</div>

</template>
<script>
import productAPI from '../api/product'
import cartAPI from '../api/cart'
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    async fetchProducts () {
      try {
        const { data } = await productAPI.getProducts()
        if (!data.success) {
          throw new Error('取得商品列表失敗')
        }
        this.products = data.products
      } catch (error) {
        window.alert(error.message)
      }
    },
    async addToCart (id, qty = 1) {
      try {
        const cartItem = {
          product_id: id,
          qty
        }
        const { data } = await cartAPI.postCart(cartItem)
        console.log(data)
      } catch (error) {
        window.alert(error.message)
      }
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
