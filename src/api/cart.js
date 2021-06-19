import axios from 'axios'

export default {
  postCart (data) {
    return axios.post(`${process.env.VUE_APP_URL}/cart`, { data })
  },
  getCart () {
    return axios.get(`${process.env.VUE_APP_URL}/cart`)
  },
  deleteCarts () {
    return axios.delete(`${process.env.VUE_APP_URL}/carts`)
  },
  deleteCart (id) {
    return axios.delete(`${process.env.VUE_APP_URL}/cart/${id}`)
  },
  putCartQty (id, item) {
    return axios.put(`${process.env.VUE_APP_URL}/cart/${id}`, { data: item })
  }
}
