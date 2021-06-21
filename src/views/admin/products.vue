<template>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ $filters.currency(item.origin_price)}}</td>
          <td class="text-right">{{ $filters.currency(item.price)}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(false, item)"
              >編輯</button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelProductModal(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="fetchProducts"></Pagination>
    <DelModal :item="tempProduct" @delItem="delProduct" ref="delModal"></DelModal>
  </div>
</template>
<script>
import adminProductsAPI from '@/api/admin/products'
import Pagination from '@/components/pagination'
import DelModal from '@/components/delModal'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {}
    }
  },
  methods: {
    async fetchProducts (page = 1) {
      try {
        const { data } = await adminProductsAPI.getAdminProducts(page)
        this.products = data.products
        this.pagination = data.pagination
      } catch (error) {
        window.alert(error.message)
      }
    },
    async delProduct () {
      try {
        const { data } = await adminProductsAPI.deleteAdminProduct(this.tempProduct.id)
        console.log(data)
        if (!data.success) {
          throw new Error('刪除商品失敗')
        }
        this.$refs.delModal.hideModal()
        this.fetchProducts()
      } catch (error) {
        window.alert(error.message)
      }
    },
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.openModal()
    }
  },
  created () {
    this.fetchProducts()
  },
  components: {
    Pagination,
    DelModal
  }
}
</script>
