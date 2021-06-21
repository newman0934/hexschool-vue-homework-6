import axios from 'axios'

export default {
  login (user) {
    return axios.post(`${process.env.VUE_APP_LOGIN_URL}/signin`, user)
  }
}
