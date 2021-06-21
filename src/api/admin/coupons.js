
import axios from 'axios'

export default {
  getAdminCoupons (page) {
    return axios.get(`${process.env.VUE_APP_ADMIN_URL}/coupons?page=${page}`)
  },
  postAdminCoupon (item) {
    return axios.post(`${process.env.VUE_APP_ADMIN_URL}/coupon`, { data: item })
  },
  putAdminCoupon (id) {
    return axios.put(`${process.env.VUE_APP_ADMIN_URL}/coupon/${id}`)
  },
  deleteAdminCoupon (id) {
    return axios.delete(`${process.env.VUE_APP_ADMIN_URL}/coupon/${id}`)
  }
}
