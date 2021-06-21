
import axios from 'axios'

export default {
  getAdminOrders (page) {
    return axios.get(`${process.env.VUE_APP_ADMIN_URL}/orders?page=${page}`)
  },
  deleteAdminOrder (id) {
    return axios.delete(`${process.env.VUE_APP_ADMIN_URL}/order/${id}`)
  }
}
