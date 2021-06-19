import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/all.scss'
import './assets/scss/custom.scss'
createApp(App).use(router).mount('#app')
