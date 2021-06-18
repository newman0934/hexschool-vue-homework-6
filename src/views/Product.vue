<template>
  <div>this is product</div>
</template>
<script>
import productAPI from '../api/product'
export default {
  data () {
    return {
      product: {}
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
        console.log(error.message)
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchProduct(id)
  }
}
</script>
