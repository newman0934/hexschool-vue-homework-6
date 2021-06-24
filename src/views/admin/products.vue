<template>
  <div class="container">
        <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openProductModal(true)">
        建立新的產品
      </button>
      </div>
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
                @click="openProductModal(false, item)"
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
    <ProductModal :product="tempProduct" :isNew="isNew" ref="productModal" @update-product="updateProduct"></ProductModal>
  </div>
</template>
<script>
import adminProductsAPI from '@/api/admin/products'
import Pagination from '@/components/pagination'
import DelModal from '@/components/delModal'
import ProductModal from '@/components/productModal'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    async fetchProducts (page = 1) {
      try {
        const { data } = await adminProductsAPI.getAdminProducts(page)
        console.log(data)
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
    async updateProduct (item) {
      try {
        this.tempProduct = item
        if (this.isNew) {
          const { data } = await adminProductsAPI.postAdminProduct(this.tempProduct)
          console.log(data)
          if (!data.success) {
            throw new Error('新增商品失敗')
          }
          this.$refs.productModal.hideModal()
          this.fetchProducts()
        } else {
          const { data } = await adminProductsAPI.putAdminProduct(this.tempProduct.id, this.tempProduct)
          console.log(data)
          if (!data.success) {
            throw new Error('修改商品失敗')
          }
          this.$refs.productModal.hideModal()
          this.fetchProducts()
        }
      } catch (error) {
        window.alert(error.message)
      }
    },
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.openModal()
    },
    openProductModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      this.$refs.productModal.openModal()
    }
  },
  created () {
    this.fetchProducts()
  },
  components: {
    Pagination,
    DelModal,
    ProductModal
  }
}
</script>
