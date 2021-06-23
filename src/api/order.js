import axios from 'axios'

export default {
  postOder (order) {
    return axios.post(`${process.env.VUE_APP_URL}/order`, { data: order })
  },
  payOrder (id) {
    return axios.post(`${process.env.VUE_APP_URL}/pay/${id}`)
  },
  getOrder (id) {
    return axios.get(`${process.env.VUE_APP_URL}/order/${id}`)
  }
}
