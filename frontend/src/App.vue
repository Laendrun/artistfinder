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
</style>