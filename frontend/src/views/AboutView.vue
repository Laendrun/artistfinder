<script setup>
  import { onMounted } from 'vue'

  onMounted(() => {
    document.title = 'À propos'
  })
</script>


<script>
// @ is an alias to /src

export default {
  name: 'AboutView',
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>