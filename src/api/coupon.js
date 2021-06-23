import axios from 'axios'

export default {
  postCoupon (data) {
    return axios.post(`${process.env.VUE_APP_URL}/coupon`, data)
  }
}
