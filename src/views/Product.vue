<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="row mb-3">
        <div class="col-6">
          <img :src="product.imageUrl" alt />
        </div>
        <div class="col-6">
          <h2>產品名稱：{{ product.title }}</h2>
          <h4>產品說明：{{ product.content }}</h4>
          <p>產品敘述：{{ product.description }}</p>
          <p>原價：{{ product.origin_price }}</p>
          <p>售價：{{ product.price }}</p>
          <input type="number" min="1" v-model.number="qty" />
          <button type="button" @click="addToCart(product.id, qty)">加入購物車</button>
        </div>
      </div>
      <div class="row">
        <img v-for="(img, i) of product.imagesUrl" :src="img" :key="i" alt="" class="col-4 mb-3">
      </div>
    </div>
  </div>
</template>
<script>
import productAPI from '../api/product'
import cartAPI from '../api/cart'
import Header from '../components/header'

export default {
  data () {
    return {
      product: {},
      qty: 1
    }
  },
  methods: {
    async fetchProduct (id) {
      try {
        const { data } = await productAPI.getProduct({ id })
        if (!data.success) {
          throw new Error('獲取商品資料失敗')
        }
        this.product = data.product
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
        if (!data.success) {
          throw new Error('加入購物車失敗')
        }
        window.alert('加入購物車成功')
      } catch (error) {
        window.alert(error.message)
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchProduct(id)
  },
  components: {
    Header
  }
}
</script>
