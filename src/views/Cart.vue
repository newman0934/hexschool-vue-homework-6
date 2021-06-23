<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button" @click="deleteCarts">清空購物車</button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="cartItem of cart.carts" :key="cartItem.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCartItem(cartItem.id)"
                  :disabled="loadingStatus.loadingItem === cartItem.id"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="loadingStatus.loadingItem === cartItem.id"
                  ></i>
                  x
                </button>
              </td>
              <td>
                {{ cartItem.product.title }}
                <div class="text-success" v-if="cartItem.coupon">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      v-model.number="cartItem.qty"
                      @blur="updateCartQty(cartItem)"
                      :disabled="loadingStatus.loadingItem === cartItem.id"
                    />
                    <span class="input-group-text" id="basic-addon2">
                      {{
                      cartItem.product.unit
                      }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                {{ cartItem.final_total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input
          type="text"
          class="form-control"
          v-model="coupon_code"
          placeholder="請輸入優惠碼"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="addCouponCode"
          >
            套用優惠碼
          </button>
        </div>
      </div>

      <v-form ref="form" class="col-md-6 mx-auto mb-5" v-slot="{ errors }" @submit="addOder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="order.user.email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="order.user.name"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10|number"
            v-model="order.user.tel"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="order.user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="order.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
import cartAPI from '../api/cart'
import Header from '../components/header'
import orderAPI from '../api/order'
import couponAPI from '../api/coupon'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, max, numeric } from '@vee-validate/rules'
import { localize, loadLocaleFromURL } from '@vee-validate/i18n'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('number', numeric)

loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
)
configure({
  generateMessage: localize('zh_TW', {
    messages: {
      number: context => `${context.field} 必須是數字喔!`
    }
  })
})

export default {
  data () {
    return {
      cart: {},
      loadingStatus: {
        loadingItem: ''
      },
      order: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: ''
    }
  },
  methods: {
    async fetchCarts () {
      try {
        const { data } = await cartAPI.getCart()
        if (!data.success) {
          throw new Error('取得購物車失敗')
        }
        this.cart = data.data
      } catch (error) {
        window.alert(error.message)
      }
    },
    async addOder () {
      try {
        const order = this.order
        const { data } = await orderAPI.postOder(order)
        if (!data.success) {
          throw new Error('送出訂單失敗')
        }
        this.$refs.form.resetForm()
        this.$router.push(`/checkout/${data.orderId}`)
      } catch (error) {
        window.alert(error.message)
      }
    },
    async deleteCarts () {
      try {
        const { data } = await cartAPI.deleteCarts()
        if (!data.success) {
          throw new Error('刪除購物車失敗')
        }
        window.alert('刪除購物車成功')
        this.fetchCarts()
      } catch (error) {
        window.alert(error.message)
      }
    },
    async deleteCartItem (id) {
      try {
        const { data } = await cartAPI.deleteCart(id)
        if (!data.success) {
          throw new Error('刪除購物車品項失敗')
        }
        window.alert('刪除成功')
        this.fetchCarts()
      } catch (error) {
        window.alert(error.message)
      }
    },
    async updateCartQty (item) {
      try {
        const cartItem = {
          product_id: item.product_id,
          qty: item.qty
        }
        const { data } = await cartAPI.putCartQty(item.id, cartItem)
        if (!data.success) {
          throw new Error('更改購物車商品數量失敗')
        }
        this.fetchCarts()
        console.log(item)
      } catch (error) {
        window.alert(error.message)
      }
    },
    async addCouponCode () {
      try {
        const { data } = await couponAPI.postCoupon({ code: this.coupon_code })
        console.log(data)
        if (!data.success) {
          throw new Error('加入優惠券失敗')
        }
        this.fetchCarts()
      } catch (error) {
        window.alert(error.message)
      }
    }
  },
  created () {
    this.fetchCarts()
  },
  components: {
    Header,
    'v-field': Field,
    'v-form': Form,
    'error-message': ErrorMessage
  }
}
</script>
