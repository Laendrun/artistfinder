<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Inscription'
})
</script>

<script>
// @ is an alias to /src
import SignupForm from '@/components/auth/SignupForm.vue'

export default {
  name: 'SignupView',
  components: {
    SignupForm
  }
}
</script>

<template>
  <div class="container">
    <SignupForm />
  </div>
</template>

<style scoped>
</style>