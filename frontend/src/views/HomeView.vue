<script setup>
  import { onMounted } from 'vue'

  onMounted(() => {
    document.title = 'Acceuil'
  })
</script>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Navbar
  }
}
</script>

<template>
  <div class="homeView">
    <Navbar />
    <HelloWorld title="Artistfinder" />
  </div>
</template>

<style scoped>
</style>