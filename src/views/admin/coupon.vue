<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="fetchCoupons"></Pagination>
    <Couponmodal :coupon="tempCoupon" :is-new="isNew" ref="couponModal" @update-coupon="updateCoupon"></Couponmodal>
    <DelModal :item="tempCoupon" @delItem="deleteCoupon" ref="delModal"></DelModal>
  </div>
</template>
<script>
import adminCouponAPI from '@/api/admin/coupons'
import Couponmodal from '@/components/couponModal'
import DelModal from '@/components/delModal'
import Pagination from '@/components/pagination'
export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false
    }
  },
  methods: {
    async fetchCoupons (page = 1) {
      try {
        const { data } = await adminCouponAPI.getAdminCoupons(page)
        if (!data.success) {
          throw new Error('取得優惠券列表失敗')
        }
        this.coupons = data.coupons
        this.pagination = data.pagination
      } catch (error) {
        window.alert(error.message)
      }
    },
    async updateCoupon (tempCoupon) {
      try {
        if (this.isNew) {
          const { data } = await adminCouponAPI.postAdminCoupon(tempCoupon)
          if (!data.success) {
            throw new Error('新增優惠券失敗')
          }
          this.fetchCoupons()
          this.$refs.couponModal.hideModal()
        } else {
          const { data } = await adminCouponAPI.putAdminCoupon(this.tempCoupon.id)
          if (!data.success) {
            throw new Error('更改優惠券失敗')
          }
          this.fetchCoupons()
          this.$refs.couponModal.hideModal()
        }
      } catch (error) {
        window.alert(error.message)
      }
    },
    async deleteCoupon () {
      try {
        const { data } = await adminCouponAPI.deleteAdminCoupon(this.tempCoupon.id)
        if (!data.success) {
          throw new Error('刪除優惠券失敗')
        }
        this.fetchCoupons()
        this.$refs.delModal.hideModal()
      } catch (error) {
        window.alert(error.message)
      }
    },
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      this.$refs.delModal.openModal()
    }
  },
  created () {
    this.fetchCoupons()
  },
  components: {
    Couponmodal,
    DelModal,
    Pagination
  }
}
</script>
