<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <v-form id="form" v-slot="{ errors }" class="form-signin">
          <div class="form-floating mb-3">
            <v-field
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              autofocus
              v-model="email"
              name="email"
              rules="required|email"
              :class="{ 'is-invalid': errors['email'] }"
            />
            <label for="username">Email address</label>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
          <div class="form-floating">
            <v-field
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
              name="password"
              rules="required|min:8"
              :class="{ 'is-invalid': errors['password'] }"
            />
            <label for="password">Password</label>
            <error-message name="password" class="invalid-feedback"></error-message>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            @click.prevent="login()"
          >
            登入
          </button>
        </v-form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>
<script>
import loginAPI from '../api/login.js'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, loadLocaleFromURL } from '@vee-validate/i18n'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
)
configure({
  generateMessage: localize('zh_TW')
})
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        if (!this.email || !this.email) {
          throw new Error('請輸入帳密')
        }
        const user = {
          username: this.email,
          password: this.password
        }
        const { data } = await loginAPI.login(user)
        if (!data.success) {
          throw new Error('無法登入')
        }
        localStorage.setItem('token', data.token)
        window.location.replace('./index.html')
      } catch (err) {
        window.alert(err.message)
      }
    }
  },
  components: {
    'v-field': Field,
    'v-form': Form,
    'error-message': ErrorMessage
  }
}
</script>
