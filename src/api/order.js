import axios from 'axios'

export default {
  postOder (order) {
    return axios.post(`${process.env.VUE_APP_URL}/order`, { data: order })
  }
}
