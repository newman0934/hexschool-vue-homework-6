import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Cart from '../views/Cart.vue'
import Product from '../views/Product.vue'
import Login from '../views/login.vue'
import Checkout from '../views/checkout'
import Admin from '../views/admin/admin.vue'
import AdminProducts from '../views/admin/products.vue'
import AdminCoupon from '../views/admin/coupon.vue'
import AdminOrder from '../views/admin/order.vue'

const Token = localStorage.getItem('token')
const hasLogin = (to, from, next) => {
  if (Token) {
    next('/')
  } else {
    next()
  }
}

const notLogin = (to, from, next) => {
  if (!Token) {
    next('/login')
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
    component: Cart,
    beforeEnter: notLogin
  },
  {
    path: '/checkout/:id',
    name: 'checkout',
    component: Checkout
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: '',
        component: AdminProducts
      },
      {
        path: 'coupon',
        component: AdminCoupon
      },
      {
        path: 'order',
        component: AdminOrder
      }
    ],
    beforeEnter: notLogin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
