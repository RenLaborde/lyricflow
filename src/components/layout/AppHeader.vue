<template>
  <header class="app-header">
    <div class="container d-flex align-items-center">
      <img
        :src="logo"
        alt="LyricFlow logo"
        class="logo-img"
      />
      <span class="brand-text ms-2">El lugar para fluir</span>
    </div>
  </header>
</template>

<script setup>
import logo from '@/assets/logo-lyricflow.png'
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0.35rem 0;
}

.logo-img {
  height: 100px; 
  width: auto;
  display: block;
}

.brand-text {
  font-weight: 1000;
  letter-spacing: 0.10em;
  color: #010b28;
  background: linear-gradient(135deg, #22d3ee, #6366f1, #ca25e8);
  text-transform: uppercase;
}
</style>
