import axios from 'axios'

export default {
  postCart (data) {
    return axios.get(`${process.env.VUE_APP_URL}/cart`, { data })
  }
}
