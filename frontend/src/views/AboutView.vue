<script setup>
  import { onMounted } from 'vue'

  onMounted(() => {
    document.title = 'À propos'
  })
</script>


<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'AboutView',
  components: {
    Navbar
  }
}
</script>

<template>
  <Navbar />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>