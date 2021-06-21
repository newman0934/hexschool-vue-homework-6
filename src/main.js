import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/all.scss'
import './assets/scss/custom.scss'
import axios from 'axios'
import { date, currency } from './util/filters'

axios.interceptors.request.use(
  config => {
    // 從 localStorage 將 token 取出
    const token = localStorage.getItem('token')
    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => Promise.reject(err)
)

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency
}

app.use(router)
app.mount('#app')
