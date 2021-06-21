<template>
  <div>
    <nav class="my-5">
      <router-link to="/admin" class="mx-3">商品列表</router-link>
      <router-link to="/admin/order" class="mx-3">訂單</router-link>
      <router-link to="/admin/coupon" class="mx-3">優惠券</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
