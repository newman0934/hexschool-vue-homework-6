
import axios from 'axios'

export default {
  getAdminProducts (page) {
    return axios.get(`${process.env.VUE_APP_ADMIN_URL}/products?page=${page}`)
  },
  deleteAdminProduct (id) {
    return axios.delete(`${process.env.VUE_APP_ADMIN_URL}/product/${id}`)
  },
  uploadFile (data) {
    return axios.post(`${process.env.VUE_APP_ADMIN_URL}/upload/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  postAdminProduct (item) {
    return axios.post(`${process.env.VUE_APP_ADMIN_URL}/product`, { data: item })
  },
  putAdminProduct (id, item) {
    return axios.put(`${process.env.VUE_APP_ADMIN_URL}/product/${id}`, { data: item })
  }
}
