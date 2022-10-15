<script setup>
  import { onMounted } from 'vue'

  onMounted(() => {
    document.title = 'Accueil'
  })
</script>

<script>
// @ is an alias to /src
import HomeDescription from '@/components/HomeDescription.vue'

export default {
  name: 'HomeView',
  components: {
    HomeDescription,
  }
}
</script>

<template>
  <div class="homeView">
    <HomeDescription />
  </div>
</template>

<style scoped>
</style>