import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Cart from '../views/Cart.vue'
import Product from '../views/Product.vue'
import Login from '../views/login.vue'

const hasLogin = (to, from, next) => {
  const hasToken = localStorage.getItem('token')
  if (hasToken) {
    next('/')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: hasLogin

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
