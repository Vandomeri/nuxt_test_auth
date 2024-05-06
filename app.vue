<script setup>
const counter = useState('counter', () => Math.round(Math.random() * 1000))
</script>
<template>
  <div>
    <NuxtLink to="/">Main</NuxtLink>
    <NuxtLink prefetch to="/products">Products</NuxtLink>
    <NuxtLink to="/test">Test</NuxtLink>
  </div>
  <NuxtPage />
</template>

<style>
@import url('~/assets/style.css')
</style>