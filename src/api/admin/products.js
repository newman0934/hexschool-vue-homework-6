
import axios from 'axios'

export default {
  getAdminProducts (page) {
    return axios.get(`${process.env.VUE_APP_ADMIN_URL}/products?page=${page}`)
  },
  deleteAdminProduct (id) {
    return axios.delete(`${process.env.VUE_APP_ADMIN_URL}/product/${id}`)
  }
}
