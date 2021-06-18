import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Cart from '../views/Cart.vue'
import Product from '../views/Product.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
