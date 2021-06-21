<template>
  <header class="header my-5">
    <router-link to="/" class="mx-3">回首頁</router-link>
    <router-link to="/cart" class="mx-3">前往購物車</router-link>
    <router-link to="/login" v-if="getToken">登入</router-link>
    <router-link to="/admin">前往後台</router-link>
  </header>
</template>
<script>
export default {
  computed: {
    getToken () {
      const token = localStorage.getItem('token')
      return !token
    }
  }
}
</script>
