import axios from 'axios'

export default {
  login (user) {
    return axios.post(`${process.env.VUE_APP_ADMIN_URL}/signin`, user)
  }
}
