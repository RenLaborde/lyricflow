<template>
  <AppHeader />

  <main class="app-main">
    <router-view />
  </main>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>
