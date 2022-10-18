<script setup>
  import Navbar from '@/components/utils/Navbar.vue'
  import Footer from '@/components/utils/Footer.vue'

</script>

<template>
  <Navbar />
  <Suspense>
    <router-view />
  </Suspense>
  <Footer />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #0ed66d;
}

.btn-primary {
    --bs-btn-bg: #0ed66d !important;
    --bs-btn-border-color: #0ed66d !important;
    --bs-btn-disabled-bg: #0ed66d !important;
    --bs-btn-disabled-border-color: #0ed66d !important;
    --bs-btn-hover-bg: #0cc647 !important;
    --bs-btn-hover-border-color: #0bc03a !important;
    --bs-btn-active-bg: #0bc03a !important;
    --bs-btn-active-border-color: #0abb2e !important;
  }

  .text-primary {
    color: #0ed66d !important;
  }
</style>