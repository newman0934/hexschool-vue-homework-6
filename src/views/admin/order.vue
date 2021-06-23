<template>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order of orders" :key="order.id" :class="{ 'text-secondary': !order.is_paid }">
          <td>{{ $filters.date(order.create_at) }}</td>
          <td>
            <span v-text="order.user.email" v-if="order.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in order.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ order.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${order.id}`"
                v-model="order.is_paid"
                @change="updatePaid(order)"
              />
              <label class="form-check-label" :for="`paidSwitch${order.id}`">
                <span v-if="order.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(order)"
              >檢視</button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelOrderModal(order)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="fetchOrders"></Pagination>
    <delModal :item="tempOrder" ref="delModal" @delItem="delOrder"></delModal>
    <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
  </div>
</template>
<script>
import adminOrdersAPI from '@/api/admin/orders.js'
import DelModal from '@/components/delModal.vue'
import OrderModal from '@/components/orderModal.vue'
import Pagination from '@/components/pagination.vue'
// import axios from 'axios'
export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {}
    }
  },
  methods: {
    async fetchOrders (page) {
      try {
        const { data } = await adminOrdersAPI.getAdminOrders(page)
        if (!data.success) {
          throw new Error('取得訂單列表失敗')
        }
        this.orders = data.orders
        this.pagination = data.pagination
      } catch (error) {
        Window.alert(error.message)
      }
    },
    async delOrder () {
      try {
        const { data } = await adminOrdersAPI.deleteAdminOrder(
          this.tempOrder.id
        )
        if (!data.success) {
          throw new Error('刪除訂單失敗')
        }
        this.$refs.delModal.hideModal()
        this.fetchOrders()
      } catch (error) {
        window.alert(error.message)
      }
    },
    async updatePaid (item) {
      try {
        this.isLoading = true
        const paid = {
          is_paid: item.is_paid
        }
        const { data } = await adminOrdersAPI.updatePaid(item.id, paid)
        if (!data.success) {
          throw new Error('修改訂單失敗')
        }
        this.isLoading = false
        this.$refs.orderModal.hideModal()
        this.fetchOrders()
      } catch (error) {
        window.alert(error.message)
      }
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      this.$refs.delModal.openModal()
    },
    openModal (item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.openModal()
    }
  },
  created () {
    this.fetchOrders()
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  }
}
</script>
